import {serve} from "bun";
import {TodoController} from "./controllers/todo.controller";
import {createServer} from "@/core/infrastructure/server";

const config = {
    controllers: [TodoController],
    port: 3003,
};

createServer(serve, config).then(() => {
    console.log('[ ready ] Server running at port', config.port);
});

