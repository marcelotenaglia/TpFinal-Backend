import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { constants } from 'src/constants/constants';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from './hash/hash.service';
import { LoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/changepass.Dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(constants.userRepository)
    private userRepository: Repository<User>,

    @Inject(constants.rolesRepository)
    private roleRepository: Repository<Role>,

    private readonly hashService: HashService,

    private readonly jwtService:JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ accest_token: string }> {
    const securedPassword = await this.hashService.hashPassWord(
      createUserDto.password,
    );

    // Verificar el DTO recibido

    const role = await this.roleRepository.findOne({
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
      relations: ['role'],
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
      password: securedPassword,
    });

     await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email, role: user.role.id };
    

    return { accest_token : await this.jwtService.signAsync(payload) };
  }

  async login(loginDto: LoginDto): Promise<{accest_token :string}> {
    //validar mail
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['role'],
    });
    if (!user) {
      throw new UnauthorizedException(`Usuario o contraseña Invalido`);
    }

    //validar Pass
    const isAuthenticated = await this.hashService.comparePassword(
      loginDto.password,
      user.password,
    );
    console.log(loginDto.password);
    console.log(user.password);

    if (!isAuthenticated) {
      throw new UnauthorizedException(`Usuario o contraseña Invalido`);
    }
    const { id, password, ...rest } = user;

    const payload = {
      sub: id,
      email : user.email,
      rol : user.role.id,
    }

    return {accest_token : await this.jwtService.signAsync(payload) };
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


  async changePassword(user_id: number, changePasswordDto: ChangePasswordDto): Promise<string> {
    const { currentPassword, newPassword } = changePasswordDto;
    // Obtener al usuario por ID
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const isAuthenticated = await this.hashService.comparePassword(
      changePasswordDto.currentPassword,
      user.password,
   
    );


    if (!isAuthenticated) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    // Encriptar la nueva contraseña
    const hashedNewPassword = await this.hashService.hashPassWord(newPassword);

    // Actualizar la contraseña en la base de datos
    await this.userRepository.update(user_id, { password: hashedNewPassword });

    return 'Contraseña actualizada correctamente';
  }
}
