import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {

  constructor (
    @Inject(constants.topicsRepository)
    private topicsRepository: Repository<Topic>,
  ) {}
  create(createTopicDto: CreateTopicDto) {
    return 'This action adds a new topic';
  }

  async findAll(): Promise<Topic[]> {
    const topics = await this.topicsRepository.createQueryBuilder('topics').getMany()

    if (!topics.length) throw new NotFoundException("No hay tópicos")
      return topics;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
