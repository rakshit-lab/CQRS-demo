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
import { UserCreatedHandler } from './events/handlers/user-created.handler';
import { UserFetchedHandler } from './events/handlers/user-fetched.handler';
import { CacheModule } from '@nestjs/cache-manager';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserHandler,GetAllUserHandler];

@Module({
  imports: [CqrsModule,
     CacheModule.register({
      ttl: 5, // default 5 seconds
      max: 100, // store up to 100 items
    }), TypeOrmModule.forFeature([Users])
],
  controllers: [UsersController],
  providers: [...CommandHandlers, ...QueryHandlers, UsersRepository, UsersService, UserCreatedHandler, UserFetchedHandler]
})  
export class UsersModule {}