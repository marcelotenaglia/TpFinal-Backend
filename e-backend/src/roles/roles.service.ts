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
    return await this.rolesRepository.find({relations: ['users']});
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
