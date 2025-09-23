import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users.controller';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { GetAllUserHandler } from './queries/handlers/get-all-user.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserHandler,GetAllUserHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Users])
],
  controllers: [UsersController],
  providers: [...CommandHandlers, ...QueryHandlers,UsersRepository,UsersService]
})  
export class UsersModule {}