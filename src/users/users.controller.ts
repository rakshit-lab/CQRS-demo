import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
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
