import { Body, Controller, Post, Get, Req, } from '@nestjs/common';
import { SESSION } from 'src/app.controller';
import { Login, Register, } from './login.interface';
import { LoginService } from './login.service';
import { Request } from 'express';
import { MailService } from 'src/mail.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class LoginController {
  @Post('login')
  async login(@Body() item: Login) {
    return await this.loginService.login(item.email, item.password)
  }
  @Post('passrecover')
  async recover(@Body() item: string) {
    const resetCode = `Rc${Math.round(Math.random() * 100000000)}`
    const msg = `Your Reset Code Is ${resetCode}`
    await this.mailService.sendMail(item, msg)
    return await this.loginService.recover(item, resetCode)
  }

  @Get('login-status')
  async status() {

    if (SESSION.user) { return { status: 'loggedin', user: SESSION.user,  visit: SESSION.visit} }
    else return { status: 'error', message: 'משתמש לא מחובר' }
  }

  @Post('logout') async logout(@Req() req: Request) {
    await this.loginService.logout(req.body)
    req.session.destroy((err) => {
      console.log(err);
    });

  }

  @Post('updateUser')
  async updateUser(@Body() item: Register) {
   
    const msg = `
   שלום ${item.fullName}
   .הפרטים האישים שלך עודכנו בהצלחה 
   המשך גלישה מהנה.

    `
    await this.mailService.sendMail(item.email, msg)
    return await this.loginService.register(item)
  }

  @Post('register')
  async register(@Body() item: Register) {
    let checkEmail = await this.loginService.checkEmail(item.email)
 
    
    if (!checkEmail) {
 const msg = `
    ברוכאים הבאים לאתר RevUnix. 
    שם המשתמש הינו ${item.fullName}
     במידה ותרצו לשנות סיסמה יש להכנס לקישור שכחתי סיסמא. 
    בעמוד ההתחברות 
    `
    await this.mailService.sendMail(item.email, msg)
    return await this.loginService.register(item)
    }else {
      item = null
      return item
    }

  
   
   
  }

  constructor(private loginService: LoginService, private mailService: MailService,) { }
}