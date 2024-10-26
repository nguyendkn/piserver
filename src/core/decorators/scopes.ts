// src/core/decorators/scopes.ts
import "reflect-metadata";
import {injectable} from "inversify";
import {container} from "@/core/infrastructure/container";

// Decorator Singleton
export function Singleton() {
    return function (target: any): void {
        injectable()(target);
        container.bind(target).toSelf().inSingletonScope(); // Đăng ký scope Singleton
    };
}

// Decorator Transient
export function Transient() {
    return function (target: any): void {
        injectable()(target);
        container.bind(target).toSelf().inTransientScope(); // Đăng ký scope Transient
    };
}

// Decorator Scoped (Request Scope)
export function Scoped() {
    return function (target: any): void {
        injectable()(target);
        container.bind(target).toSelf().inRequestScope(); // Đăng ký scope Request
    };
}
