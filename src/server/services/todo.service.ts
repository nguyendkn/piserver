import {Transient} from "@/core/decorators/scopes";

@Transient() // Đảm bảo mỗi khi inject sẽ tạo một instance mới
export class TodoService {
    private todos: Todo[] = [];
    private currentId = 1;

    getAllTodos(): Todo[] {
        return this.todos;
    }

    addTodo(title: string): Todo {
        const newTodo = { id: this.currentId++, title, completed: false };
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodoById(id: number): boolean {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            return true;
        }
        return false;
    }
}