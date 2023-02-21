import {  Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards,  } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/login/login.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    @Get()
    @UseGuards(new AuthGuard()) 
    async users() {
        return await this.usersService.getUsers()
    }
   
    @Put('update') 
    @UseGuards(new AuthGuard())
    async update(@Body() item: User) { return await this.usersService.update(item); }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    async delete(@Param('id', new ParseIntPipe()) userID: number,
    ) {
       
        return await this.usersService.removeUser(userID);
    }


    constructor(private usersService: UsersService,) { }
}
