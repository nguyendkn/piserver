export interface IMiddleware {
    execute(req: Request, next: () => Promise<Response>): Promise<Response> | Response;
}