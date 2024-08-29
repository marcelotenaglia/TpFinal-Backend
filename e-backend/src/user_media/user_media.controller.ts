import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserMediaService } from './user_media.service';
import { CreateUserMediaDto } from './dto/create-user_media.dto';
import { UpdateUserMediaDto } from './dto/update-user_media.dto';

@Controller('/usermedia')
export class UserMediaController {
  constructor(private readonly userMediaService: UserMediaService) {}

  @Post()
  create(@Body() createUserMediaDto: CreateUserMediaDto) {
    return this.userMediaService.create(createUserMediaDto);
  }

  @Get()
  findAll() {
    return this.userMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMediaService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserMediaDto: UpdateUserMediaDto
  ) {
    return this.userMediaService.update(+id, updateUserMediaDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userMediaService.remove(+id);
  }
}
