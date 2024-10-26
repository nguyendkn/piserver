import "reflect-metadata";
import {injectable} from "inversify";
import {container} from "@/core/infrastructure/container";

export function Controller(path: string): ClassDecorator {
    return function (target: any) {
        // Đăng ký với Inversify container nếu chưa được đăng ký
        if (!container.isBound(target)) {
            injectable()(target); // Gắn @injectable cho class
            container.bind(target).toSelf(); // Đăng ký class với container
        }

        // Thêm metadata cho đường dẫn của controller
        Reflect.defineMetadata("controller:path", path, target);
    };
}
