import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews/reviews.entity';
import { User } from './login/login.entity';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { Support } from './support/support.entity';
import { SupportController } from './support/support.controller';
import { SupportService } from './support/support.service';
import { Comment } from './comments/comments.entity';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { Like } from './likes/likes.entity';
import { LikesService } from './likes/likes.service';
import { LikesController } from './likes/likes.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { FavController } from './favorites/favorites.controller';
import { FavService } from './favorites/favorites.service';
import { MailService } from './mail.service';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'revunixtest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

      logging: true,
    }),
    TypeOrmModule.forFeature([Review, User, Support, Comment, Like])
  ],
  controllers: [
    AppController,
    ReviewsController,
    LoginController,
    SupportController,
    CommentsController,
    LikesController,
    UsersController,
    FavController,
  ],
  
  providers: [
    AppService,
    ReviewsService,
    LoginService,
    SupportService,
    CommentsService,
    LikesService,
    UsersService,
    FavService,
    MailService
  ]
})
export class AppModule { }
