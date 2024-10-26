import "reflect-metadata";

// Decorator cho action, xử lý thêm metadata cho method hoặc property
export function Action(route: string): MethodDecorator {
    return (target, propertyKey, descriptor: PropertyDescriptor | undefined): void => {
        // Lấy danh sách các action hiện tại từ metadata hoặc khởi tạo mới
        const actions = Reflect.getMetadata("controller:actions", target) || [];

        // Thêm route và tên phương thức vào danh sách action
        actions.push({route, propertyKey});

        // Cập nhật lại metadata của controller với danh sách action
        Reflect.defineMetadata("controller:actions", actions, target);
    };
}
