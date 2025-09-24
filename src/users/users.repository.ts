import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";
import { EventBus } from "@nestjs/cqrs";
import { UserCreatedEvent } from "./events/impl/user-created.event";
import { UserFetchedEvent } from "./events/impl/user-fetched.event";
import type { Cache } from 'cache-manager';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
    private readonly eventBus: EventBus,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async findById(id: string): Promise<Users | null> {
    try {
      const key = `user:${id}`;
 
      let user = await this.cacheManager.get<Users>(key);
      if (user) {
        return user;
      }

      let userData = await this.repo.findOne({ where: { id: Number(id) } });
      
      if (userData) {
        await this.cacheManager.set(key, userData, 50000); 
        this.eventBus.publish(new UserFetchedEvent(String(userData.id)));
      }
      
      return userData;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch user by ID: ${error.message}`);
    }
  }

  async findAll(query: any): Promise<Users[]> {
    try {
      const { page = 1, limit = 10 } = query;
      return this.repo.find({
        skip: (page - 1) * limit,
        take: limit,
        order: { name: 'ASC' }
      });

    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch users: ${error.message}`);
    }
  }

  async createUser(name: string, email: string): Promise<Users> {
    try {
      const existing = await this.repo.findOne({ where: { email } });
      if (existing) {
        throw new BadRequestException(`User with email ${email} already exists`);
      }
      const newUser = this.repo.create({ name, email });
      const savedUser = await this.repo.save(newUser);

      this.eventBus.publish(
        new UserCreatedEvent(String(savedUser.id), savedUser.name, savedUser.email),
      );

      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }
}