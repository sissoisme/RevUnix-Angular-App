import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) { }
    
    async getComments() {
        return await this.commentRepository.find();
    }
    
    async addComments(item: Comment) {
        return await this.commentRepository.save(item);
    }

    async getMyComments(item: any) {
        return await this.commentRepository.find({ where: { userId: item[0] } });
    }

    async updateMyComment(item: any) {
        return await this.commentRepository.save(item);
    }

    async removeComment(id: number) {
        await this.commentRepository.delete(id);
    }

}
