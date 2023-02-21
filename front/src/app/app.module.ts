import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RevDisplayComponent } from './rev-display/rev-display.component';
import { routes } from './routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserplaceComponent } from './userplace/userplace.component';
import { ReviewManageComponent } from './review-manage/review-manage.component';
import { UtilityService } from './utillity.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarouselTempletComponent } from './carousel-templet/carousel-templet.component';
import { InputManageComponent } from './input-manage/input-manage.component';
import { SearchPipe } from './search.pipe';
import { RangeComponent } from './range/range.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { LogoComponent } from './logo/logo.component';
import { AlertComponent } from './alert/alert.component';
import { SupportComponent } from './support/support.component';
import { SupportManageComponent } from './support-manage/support-manage.component';
import { FavouritesRevComponent } from './my-favourites-list/favourites-rev.component';
import { FooterComponent } from './footer/footer.component';
import { AboutBoxComponent } from './about-box/about-box.component';
import { ManagCommentsComponent } from './manag-comments/manag-comments.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { BoxDisplayReviewsComponent } from './box-display-reviews/box-display-reviews.component';
import { LikelistComponent } from './all-likes-list/all-likes-list.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IgxAvatarModule, IgxBadgeModule, IgxButtonModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxProgressBarModule, IgxRippleModule,  } from "igniteui-angular";
import { IgxPreventDocumentScrollModule } from "./directives/prevent-scroll.directive";
import { BnNgIdleService } from 'bn-ng-idle';
import { AboutPageComponent } from './about-page/about-page.component';
import { PassrecoveryComponent } from './passrecovery/passrecovery.component';
import { NewpassComponent } from './newpass/newpass.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RevDisplayComponent,
    UserplaceComponent,
    ReviewManageComponent,
    LoginComponent,
    RegisterComponent,
    CarouselTempletComponent,
    InputManageComponent,
    SearchPipe,
    RangeComponent,
    AccessibilityComponent,
    LogoComponent,
    AlertComponent,
    SupportComponent,
    SupportManageComponent,
    FavouritesRevComponent,
    FooterComponent,
    AboutBoxComponent,
    ManagCommentsComponent,
    UserManageComponent,
    BoxDisplayReviewsComponent,
    LikelistComponent,
    AboutPageComponent,
    PassrecoveryComponent,
    NewpassComponent,


    //I keep the new line
  ],
  imports: [

    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    IgxPreventDocumentScrollModule,
    IgxAvatarModule,
    IgxBadgeModule,
    IgxButtonModule,
    IgxGridModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxProgressBarModule,
    IgxRippleModule,

  ],
  providers: [UtilityService,
    BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
