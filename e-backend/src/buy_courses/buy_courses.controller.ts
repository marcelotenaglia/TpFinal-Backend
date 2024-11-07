import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('buy-courses')
export class BuyCoursesController {
  constructor(private readonly buyCoursesService: BuyCoursesService) {}


  @Post(':user_id/:course_id')
  @HttpCode(HttpStatus.CREATED)
  //@UseGuards(AuthGuard)
  async buyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  )
  {
    return await this.buyCoursesService.buyCourse(user_id,course_id)
  }

  @Delete(':user_id/:course_id')
  @HttpCode(HttpStatus.OK)
  //@UseGuards(AuthGuard)
  async deleteBuyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  )
  {
    return await this.buyCoursesService.returnCourse(user_id,course_id);
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  async getBuyCoursesxUser(@Param('user_id')user_id: number,)
  {
    return await this.buyCoursesService.getUserBuyCourses(user_id);
  }

}
