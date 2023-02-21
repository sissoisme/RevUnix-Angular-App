import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewsService {
    async getReviews() {
        let reviews = await this.reviewsRepository.find()
        return reviews.reverse()

    }

    async getMyReviews(item:any) {
        return await this.reviewsRepository.find({ where: { authorId: item[0] } })
    }

    async getReview(id: number) {
        return await this.reviewsRepository.findOne({ where: { id   }});
    }
 
    async getReviewsFiltered(item: any) {
      
        if (item[1] == 1){return await this.reviewsRepository.find({ where: { topic: item[0] } })  ;}
        if (item[1] == 2){return await this.reviewsRepository.find({ where: { rate: item[0] } })  ;}
        if (item[1] == 3){return await this.reviewsRepository.find({ where: { category: item[0] } })  ;}
       
    }

    async getReviewsSorted(item: any) {
        if (item[0] == 1){return await this.reviewsRepository.find({order: {title: "ASC",}});}
        if (item[0]  == 2){return await this.reviewsRepository.find({order: {title: "DESC",}});}
        if (item[0]  == 3){return await this.reviewsRepository.find({order: {id: "ASC",}});}
        if (item[0]  == 4){return await this.reviewsRepository.find({order: {id: "DESC",}});}
        if (item[0]  == 5){return await this.reviewsRepository.find({order: {rate: "ASC",}});}
        if (item[0]  == 6){return await this.reviewsRepository.find({order: {rate: "DESC",}});}
    }

    async addReview(item: Review) {
        return await this.reviewsRepository.save(item);
    }
    async removeReview(id: number) { await this.reviewsRepository.delete(id); }
    
    constructor(@InjectRepository(Review) private reviewsRepository: Repository<Review>
    ) { }
}


