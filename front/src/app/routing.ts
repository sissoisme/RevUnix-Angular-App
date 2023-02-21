import { Routes } from "@angular/router";
import { AboutPageComponent } from "./about-page/about-page.component";
import { AccessibilityComponent } from "./accessibility/accessibility.component";
import { HomeComponent } from "./home/home.component";
import { InputManageComponent } from "./input-manage/input-manage.component";
import { LoginComponent } from "./login/login.component";
import { NewpassComponent } from "./newpass/newpass.component";
import { PassrecoveryComponent } from "./passrecovery/passrecovery.component";

import { RegisterComponent } from "./register/register.component";
import { RevDisplayComponent } from "./rev-display/rev-display.component";
import { SupportManageComponent } from "./support-manage/support-manage.component";
import { SupportComponent } from "./support/support.component";
import { UserManageComponent } from "./user-manage/user-manage.component";
import { UserplaceComponent } from "./userplace/userplace.component";



export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'rev-disp', component: RevDisplayComponent },
    { path: 'user-place', component: UserplaceComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'input-manage', component: InputManageComponent },
    { path: 'input-manage/:id', component: InputManageComponent },
    { path: 'input-manage/Books', component: InputManageComponent },
    { path: 'input-manage/TV', component: InputManageComponent },
    { path: 'input-manage/Movies', component: InputManageComponent },
    { path: 'accessibility', component: AccessibilityComponent },
    { path: 'support', component: SupportComponent },
    { path: 'support-manage/:status', component: SupportManageComponent },
    { path: 'user-manage', component: UserManageComponent },
    { path: 'passrec', component: PassrecoveryComponent },
    { path: 'newpass', component: NewpassComponent },
 
];



