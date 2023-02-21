import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CommentsService } from './comments.service';

@Controller('comments/')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @Get()
    async comments() {
        return await this.commentsService.getComments()
    }

    @Post() 
    async add(@Body() item: any){
        return await this.commentsService.addComments(item)
    }

    @Post('mycomments') 
    async myComments(@Body() item: any){
        return await this.commentsService.getMyComments(item)
    }
    
    @Put() 
    async update(@Body() item: any){
        return await this.commentsService.updateMyComment(item)
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    async delete(@Param('id', new ParseIntPipe()) commentId: number,
    ) {
        return await this.commentsService.removeComment(commentId);
    }


}