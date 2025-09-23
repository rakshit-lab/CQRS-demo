import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl/get-all-user.query';
import { UsersRepository } from 'src/users/users.repository';

@QueryHandler(GetUsersQuery)
export class GetAllUserHandler implements IQueryHandler<GetUsersQuery> {
//   private users: any[] = [
//     { id: '1', name: 'Alice', email: 'alice@yopmail.com' },
//     { id: '2', name: 'John', email: 'johnplayer@yopmail.com' },
//     { id: '3', name: 'Abc', email: 'abc@yopmail.com' },
//   ];
    constructor(private readonly repo: UsersRepository) {}

  async execute(query: GetUsersQuery): Promise<any> {
    return this.repo.findAll(query.filters);
  }
}
