import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {

  constructor (
    @Inject(constants.topicsRepository)
    private topicsRepository: Repository<Topic>,
  ) {}


  async findAll(): Promise<Topic[]> {
    const topics = await this.topicsRepository.createQueryBuilder('topics').getMany()

    if (!topics.length) throw new NotFoundException("No hay tópicos")
      return topics;
  }


}
