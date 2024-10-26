import {IServerConfig} from "@/core/interfaces/server";
import {Serve} from "bun";
import {container} from "@/core/infrastructure/container";

export async function createServer(server: (options: Serve<any>) => any, config: IServerConfig) {
    const {controllers, middlewares = [], port} = config;

    server({
        port,
        fetch: async (req) => {
            let handled = false;

            // Duyệt qua các controller để tìm route phù hợp
            for (const ControllerClass of controllers) {
                const controllerInstance = container.resolve(ControllerClass);
                const path = Reflect.getMetadata("controller:path", ControllerClass);
                const actions: { route: string; propertyKey: string }[] = Reflect.getMetadata(
                    "controller:actions",
                    ControllerClass.prototype
                ) || [];

                for (const {route, propertyKey} of actions) {
                    // Tạo URL cho action của controller
                    const actionUrl = `${path}${route}`;
                    if (req.url.includes(actionUrl)) {
                        const actionHandler = (controllerInstance as any)[propertyKey].bind(controllerInstance);
                        let response = await actionHandler(req);

                        // Thực thi middleware (nếu có)
                        for (const middleware of middlewares) {
                            response = await middleware.execute(req, async () => response);
                        }

                        handled = true;
                        return response; // Trả về response sau khi xử lý xong
                    }
                }
            }

            if (!handled) {
                return new Response("Not Found", {status: 404});
            }
        },
    });
}
