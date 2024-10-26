export interface IAction {
    (req: Request): Promise<Response> | Response;
}