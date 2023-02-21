import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/login/login.entity';
import { MailService } from 'src/mail.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    async getUsers() {
        return await this.userRepository.find()
    }
    
    async update(item: any) {
      return await this.userRepository.save(item);
    }

    async removeUser(id: number) {
        let user = this.userRepository.findOne({ where: { id } });
        
        const msg ='משתמש נמחק מהאתר בהצלחה.'
        await this.mailService.sendMail((await user).email, msg)
      await this.userRepository.delete(id);
    }
  constructor(@InjectRepository(User) private userRepository: Repository<User>,private mailService: MailService) {}
}
