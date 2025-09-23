import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { CreateUserCommand } from "./commands/impl/create-user.command";
import { GetUserQuery } from "./queries/impl/get-user.query";
import { GetUsersQuery } from "./queries/impl/get-all-user.query";

@Injectable()
export class UsersService {

     constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    async createUser(name: string, email: string) {
        const id = randomUUID();
        return this.commandBus.execute(
        new CreateUserCommand(id, name, email),
        );
    }

    async getUser(id: string) {
        return this.queryBus.execute(new GetUserQuery(id));
    }

    async getUsers(name?: string,email?: string) {
        return this.queryBus.execute(new GetUsersQuery({ name, email }));
    }
}