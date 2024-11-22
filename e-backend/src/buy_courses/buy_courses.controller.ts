import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('buy-courses')
export class BuyCoursesController {
  constructor(private readonly buyCoursesService: BuyCoursesService) {}


  @Post(':user_id/:course_id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buy a course for a user' }) // Describe la operación
  @ApiParam({ name: 'user_id', type: Number, description: 'ID of the user' }) // Parámetro user_id
  @ApiParam({ name: 'course_id', type: Number, description: 'ID of the course' }) // Parámetro course_id
  @ApiResponse({ status: 201, description: 'Course purchased successfully', type: Boolean })
  @ApiResponse({ status: 404, description: 'User or course not found' })
  @ApiResponse({ status: 409, description: 'User already purchased this course' })
  async buyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  )
  {
    return await this.buyCoursesService.buyCourse(user_id,course_id)
  }

  @Delete(':user_id/:course_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return a purchased course within 48 hours' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID of the user' })
  @ApiParam({ name: 'course_id', type: Number, description: 'ID of the course' })
  @ApiResponse({ status: 200, description: 'Course returned successfully', type: Boolean })
  @ApiResponse({ status: 404, description: 'User or course not found, or course not purchased by user' })
  @ApiResponse({ status: 409, description: 'Return period expired (48 hours)' })
  async deleteBuyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  )
  {
    return await this.buyCoursesService.returnCourse(user_id,course_id);
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses purchased by a user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of courses purchased by the user'})
  @ApiResponse({ status: 404, description: 'No courses found for this user' })
  async getBuyCoursesxUser(@Param('user_id')user_id: number,)
  {
    return await this.buyCoursesService.getUserBuyCourses(user_id);
  }

}
