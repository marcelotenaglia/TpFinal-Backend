import { Inject, Injectable } from '@nestjs/common';
import { CreateUserMediaDto } from './dto/create-user_media.dto';
import { UpdateUserMediaDto } from './dto/update-user_media.dto';
import { constants } from 'src/constants/constants'; 
import { Repository } from 'typeorm';
import { UserMedia } from './entities/user_media.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserMediaService {

  constructor (

    @Inject(constants.userMediaRepository)
    private userMediaRepository: Repository <UserMedia>,
    @Inject(constants.userRepository)
    private userRepository: Repository <User>
  ) {} //hasta aca!

  create(createUserMediaDto: CreateUserMediaDto) {
    return 'This action adds a new userMedia';
  }

  findAll() {
    return `This action returns all userMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMedia`;
  }

  update(id: number, updateUserMediaDto: UpdateUserMediaDto) {
    return `This action updates a #${id} userMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMedia`;
  }
}
