import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor (
    @Inject(constants.userRepository)
    private userRepository: Repository <User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise <User> {
    const user = await this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    if (!users.length) throw new NotFoundException("No hay usuarios en la base de datos")
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })
    if (!user) throw new NotFoundException(`No existe ningun usuario con el id: ${id}`)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
