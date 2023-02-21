import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Like } from "../likes/likes.entity";
import { Review } from "../reviews/reviews.entity";

@Injectable()
export class FavService {
    constructor(@InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,) { }

    async getFavorites(item:any) {
        let returnList:Review[] = [];
        let datalikes:Like[] = await this.likesRepository.find({ where: { userId:  item[0] } }) ;
        let datareview = await this.reviewsRepository.find();
        for (const like of datalikes) {
            const rev = datareview.find(rev => rev.id === like.revId);
            returnList.push(rev);
        }
        return returnList;
    };

}
