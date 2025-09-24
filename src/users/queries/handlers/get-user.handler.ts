import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UsersRepository } from 'src/users/users.repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(private readonly repo: UsersRepository) { }
  
  async execute(query: GetUserQuery): Promise<any> {
    return this.repo.findById(query.id);
  }
}
