import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(constants.rolesRepository)
    private rolesRepository: Repository<Role>,
    @Inject(constants.userRepository)
    private userRepository: Repository<User>
  ){}




  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);

  }

  async findAll(): Promise<Role[]> {
    const roles = await this.rolesRepository
  .createQueryBuilder('role')
  .leftJoinAndSelect('role.users', 'user') // Realiza el join con la tabla `users`
  .select([
    'role.id',          // Selecciona el campo `id` de la tabla `roles`
    'role.name',        // Selecciona el campo `name` de la tabla `roles`
    'user.id',          // Selecciona el campo `id` de la tabla `users`
    'user.name',        // Selecciona el campo `name` de la tabla `users`
    'user.email'        // Selecciona el campo `email` de la tabla `users`
  ])
  .getMany();

    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
