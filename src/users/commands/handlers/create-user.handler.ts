import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/users/users.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

   constructor(
    private readonly userRepo: UsersRepository
  ) {}


  async execute(command: CreateUserCommand): Promise<any> {
    return this.userRepo.createUser(command.name, command.email);
  }
}
