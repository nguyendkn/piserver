import {inject} from "inversify";
import {Controller} from "@/core/decorators/controller";
import {Singleton} from "@/core/decorators/scopes";
import {TodoService} from "../services/todo.service";
import {Action} from "@/core/decorators/action";

@Controller("/todos")
@Singleton()
export class TodoController {
    constructor(@inject(TodoService) private todoService: TodoService) {
    }

    @Action("/")
    getAllTodos(req: Request) {
        const todos = this.todoService.getAllTodos();
        return new Response(JSON.stringify(todos), {
            headers: {"Content-Type": "application/json"},
        });
    }

    @Action("/")
    async addTodo(req: Request) {
        const {title} = await req.json();
        const newTodo = this.todoService.addTodo(title);
        return new Response(JSON.stringify(newTodo), {
            headers: {"Content-Type": "application/json"},
        });
    }

    @Action("/:id")
    deleteTodo(req: Request) {
        const url = new URL(req.url);
        const id = Number(url.pathname.split("/").pop());

        if (this.todoService.deleteTodoById(id)) {
            return new Response("Deleted successfully", {status: 200});
        } else {
            return new Response("Todo not found", {status: 404});
        }
    }
}
