import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(constants.userRepository)
    private userRepository: Repository<User>,

    @Inject(constants.rolesRepository)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    //controlar el Rol
    const role = await this.userRepository.findOne({
      where: { id: createUserDto.roleId },
    });

    if (!role) {
      throw new NotFoundException(
        `No se encontró un rol con el ID ${createUserDto.roleId}`,
      );
    }
    //Controlar la edad
    const birthdate = new Date(createUserDto.birthdate);

    const age = this.calculateAge(birthdate);
    if (age < 15) {
      throw new BadRequestException('El usuario debe ser mayor de 15 años');
    }
    //Controlar el Email
    const mail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (mail) {
      throw new NotFoundException(
        `El usuario con el correo ${createUserDto.email} ya existe`,
      );
    }
    //cargar el usuario
    const user = await this.userRepository.create({
      ...createUserDto,
      role,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length)
      throw new NotFoundException('No hay usuarios en la base de datos');
    return users;
  }

  async findOne(id: number): Promise<User> {
    const users = await this.userRepository.findOne({ where: { id } });
    if (!users)
      throw new NotFoundException(
        'El usuario no existe o no se encuentra en la base de datos',
      );
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`No se encontró un usuario con el ID ${id}`);

    //si actulizamos el Rol del usuario
    if (updateUserDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: updateUserDto.roleId },
      });
      if (!role)
        throw new NotFoundException(
          `No se encontró un rol con el ID ${updateUserDto.roleId}`,
        );
      user.role = role;
    }

    if (updateUserDto.birthdate) {
      const birthdate = new Date(updateUserDto.birthdate);
      const age = this.calculateAge(birthdate);
      if (age < 15) {
        throw new BadRequestException('El usuario debe ser mayor de 15 años');
      }
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(`No se encontró un usuario con el ID ${id}`);
    await this.userRepository.delete(user);
  }

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
