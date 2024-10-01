import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { constants } from 'src/constants/constants';
import { QueryFailedError, Repository } from 'typeorm';
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
    // Verificar el DTO recibido

    const role = await this.userRepository.findOne({
      where: { id: createUserDto.role_id },
    });

    if (!role) {
      throw new NotFoundException(
        `No se encontró un rol con el ID ${createUserDto.role_id}`,
      );
    }

    // Verificar la edad
    const birthdate = new Date(createUserDto.birthdate);
    const age = this.calculateAge(birthdate);

    if (age < 15) {
      throw new BadRequestException('El usuario debe ser mayor de 15 años');
    }

    const mail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Verificar si el correo ya existe

    if (mail) {
      throw new NotFoundException(
        `El usuario con el correo ${createUserDto.email} ya existe`,
      );
    }

    const user = await this.userRepository.create({
      ...createUserDto,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'user.id', // Selecciona el campo `id` de la tabla `users`
        'user.name', // Selecciona el campo `name` de la tabla `users`
        'user.email', // Selecciona el campo `email` de la tabla `users`
        'user.role_id', // Selecciona el campo `role_id` de la tabla `users`
        'role.name', // Selecciona el campo `name` de la tabla `roles`
      ])
      .getMany(); // Esto obtiene el array de resultados

    if (!users.length)
      throw new NotFoundException('No hay usuarios en la base de datos');

    return users;
  }

  async findOne(id: number): Promise<User> {
    const users = await this.userRepository
      .createQueryBuilder('user') //.findOne({ where: { id } });
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'user.id', // Selecciona el campo `id` de la tabla `users`
        'user.name', // Selecciona el campo `name` de la tabla `users`
        'user.email', // Selecciona el campo `email` de la tabla `users`
        'user.role_id', // Selecciona el campo `role_id` de la tabla `users`
        'role.name', // Selecciona el campo `name` de la tabla `roles`
      ])
      .where('user.id = :id', { id })
      .getOne();

    if (!users)
      throw new NotFoundException(
        'El usuario no existe o no se encuentra en la base de datos',
      );
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });

      if (!user)
        throw new NotFoundException(
          `No se encontró un usuario con el ID ${id}`,
        );

      //si actulizamos el Rol del usuario
      if (updateUserDto.role_id) {
        const role = await this.roleRepository.findOne({
          where: { id: updateUserDto.role_id },
        });
        if (!role)
          throw new NotFoundException(
            `No se encontró un rol con el ID ${updateUserDto.role_id}`,
          );
        user.role = role;
      }
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('El correo electrónico ya está en uso');
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
    user.disable = false;
    await this.userRepository.save(user);
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
