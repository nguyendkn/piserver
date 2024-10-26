import {IController} from "./controller";
import {IMiddleware} from "./middleware";

export interface IServerConfig {
    controllers: (new (...args: any[]) => IController)[];  // Mảng các Controller
    middlewares?: IMiddleware[];                           // Các middleware tùy chọn
    port: number;                                          // Port của server
}