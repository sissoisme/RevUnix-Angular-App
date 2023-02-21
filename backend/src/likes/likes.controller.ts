import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { LikesService } from './likes.service';

@Controller('likes/')
export class LikesController {
    
    constructor(private LikeService: LikesService) { }

    @Get()
    async likes() {
        return await this.LikeService.getLikes()
    }
    @Post() 
    async add(@Body() item: any){
        return await this.LikeService.addLike(item)
    }
    @Post('mylikes') 
    async getMyLikes(@Body() item: any){
        return await this.LikeService.getMyLikes(item)
    }
    
    @Post("deletMyLike")
    async likestest(@Body() item: any) {
        return await this.LikeService.deletMyLike(item)
    }
    @Delete(':id')
    @UseGuards(new AuthGuard())
    async delete(@Param('id', new ParseIntPipe()) like: number,
    ) {
        return await this.LikeService.removeLike(like);
    }
}