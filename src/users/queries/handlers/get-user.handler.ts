import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UsersRepository } from 'src/users/users.repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
//   private users: any[] = [
//     { id: '1', name: 'Alice', email: 'alice@example.com' },
//   ];
    constructor(private readonly repo: UsersRepository) {}
  async execute(query: GetUserQuery): Promise<any> {
    // const { id } = query;
    // return this.users.find((user) => user.id == id);
    return this.repo.findById(query.id);
  }
}
