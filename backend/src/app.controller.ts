import { All, Controller, Get, Next, Session } from '@nestjs/common';
import { NextFunction } from 'express';
import { userInfo } from 'os';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';


export let SESSION: Record<string, any>;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly loginService: LoginService) { }
  user
  
  @All('*')
  async proxyRequest(@Next() next: NextFunction, @Session() session: Record<string, any>) {
    SESSION = session;
    if(session.user)
    {this.user=session.user}


   

    SESSION.visit = SESSION.visit ? SESSION.visit + 1 : 1;
    console.log(SESSION.visit);

    if (SESSION.visit >= 500) {
      this.loginService.logout((this.user))
      session.destroy((err) => {
        console.log(err);
      });
    }
    next();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
