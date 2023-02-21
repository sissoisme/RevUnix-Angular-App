import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './likes.entity';

@Injectable()
export class LikesService {

    async getLikes() {
        return await this.likesRepository.find()
    }
    async deletMyLike(item: any) {

        const liketodelete = await this.likesRepository.findOneBy({
            userId: item[0],
            revId: item[1]
        })
        await this.likesRepository.remove(liketodelete);
    }

    async getMyLikes(item: any) {
        return await this.likesRepository.find({ where: { userId: item[0] } });
    }

    async addLike(item: Like) {
        return await this.likesRepository.save(item);
    }

    async removeLike(id: number) {
        await this.likesRepository.delete(id);
    }

    constructor(
        @InjectRepository(Like) private likesRepository: Repository<Like>) { }
}


