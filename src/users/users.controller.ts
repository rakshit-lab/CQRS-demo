import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body.name, body.email);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
  }

  @Get()
  async getUsers(
    @Query('name') name?: string,
    @Query('email') email?: string
  ) {
        return this.usersService.getUsers(name, email);
  }
}
