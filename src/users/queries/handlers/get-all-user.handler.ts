import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl/get-all-user.query';
import { UsersRepository } from 'src/users/users.repository';

@QueryHandler(GetUsersQuery)
export class GetAllUserHandler implements IQueryHandler<GetUsersQuery> {
    constructor(private readonly repo: UsersRepository) {}

  async execute(query: GetUsersQuery): Promise<any> {
    return this.repo.findAll(query.filters);
  }
}
