import { Body, Controller, Post } from "@nestjs/common";
import { FavService } from "./favorites.service";

@Controller('fav/')
export class FavController {
    constructor(private favService: FavService) { }

    @Post('')
    async getFavorites(@Body() item: any) { 
    
        return await this.favService.getFavorites(item)
    }
}