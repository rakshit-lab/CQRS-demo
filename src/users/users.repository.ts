import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserCommand } from "./commands/impl/create-user.command";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>
  ) {}

  async findById(id: string): Promise<Users | null> {
    return this.repo.findOne({ where: { id: Number(id) } });
  }

  async findAll(query:any): Promise<Users[]> {
    return this.repo.find(query);
  }

  async createUser(name:string, email:string): Promise<Users> {
    const newUser = this.repo.create({ name, email });
    return this.repo.save(newUser);
  }
}