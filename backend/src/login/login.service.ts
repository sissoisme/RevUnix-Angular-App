import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SESSION } from 'src/app.controller';
import { Repository } from 'typeorm';
import { User } from './login.entity';
import { Register } from './login.interface';

@Injectable()
export class LoginService {
  attemps = 0
  async register(item: Register) {

   
    const obj = this.rep.create(item);
    return await this.rep.save(obj)
  }

  async recover(email: string, resetCode: any) {
    
    const user = await this.rep.findOne({ where: { email } });

   
    await this.rep.update({
      email: user.email
    }, {
      resetPass: true,
      resetCode: resetCode
    });
  }

  async checkEmail(email: string,) {
   
    const user = await this.rep.findOne({ where: { email } });
    return user
    
  }


  async login(email: string, password: string) {
    let user = await this.rep.findOne({ where: { email } });

    if (!user) {
      return user = undefined
    }
    await this.rep.update({
      email: user.email
    }, {
      isConnected: true,
    });
    if (user.resetCode == password) {
      this.attemps = 0
      SESSION.user = user
      user.resetPass = true
      return user;
    }
    if (!(await user.comparePassword(password))) {
      user = undefined
    }
    this.attemps = 0
    SESSION.user = user
    return user;
  }
  async logout(item: any) {
    await this.rep.update({
      email: item.email
    }, {
      isConnected: false,
    });
  }
  constructor(@InjectRepository(User) private rep: Repository<User>,) { }
}