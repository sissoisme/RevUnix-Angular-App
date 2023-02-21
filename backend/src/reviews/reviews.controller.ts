import { Body, Controller, Delete, Get, Param, ParseIntPipe,  Post, } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.entity';

@Controller('reviews/')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) { }

  @Get()
  async reviews() {
    return await this.reviewsService.getReviews()
  }

  @Post("filter")
  async filterReview(@Body() item: any) {
    return await this.reviewsService.getReviewsFiltered(item)
  }

  @Post("sorter")
  async sortReview(@Body() item: any) {
    return await this.reviewsService.getReviewsSorted(item)
  }

  @Get(':id') async review(@Param('id', new ParseIntPipe()) reviewID: number) {
    return await this.reviewsService.getReview(reviewID);
  }

  @Post('myreviews')
  async getMyreviews(@Body() item: any) {
    return await this.reviewsService.getMyReviews(item)
  }

  @Post()
  async add(@Body() item: Review) {
    return await this.reviewsService.addReview(item)
  }
  @Delete(':id') async delete(
    @Param('id', new ParseIntPipe()) reviewId: number,
  ) {
    return await this.reviewsService.removeReview(reviewId);
  
  }

}



