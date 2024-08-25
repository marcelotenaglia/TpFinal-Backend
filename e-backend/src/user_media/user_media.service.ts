import { Injectable } from '@nestjs/common';
import { CreateUserMediaDto } from './dto/create-user_media.dto';
import { UpdateUserMediaDto } from './dto/update-user_media.dto';

@Injectable()
export class UserMediaService {
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
