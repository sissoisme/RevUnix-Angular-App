import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

import { UtilityService } from './utillity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(public utility: UtilityService, private http: HttpClient, private router: Router, private bnIdle: BnNgIdleService) {







  }
  title = 'runapp';


  logout() {

    const sub = this.http
      .post<void>('http://localhost:3000/logout', this.utility.user, { withCredentials: true, })
      .subscribe(() => {
        this.utility.user = undefined;
        this.utility.isConnected = false
        this.router.navigate(['']);
        sub.unsubscribe();

        this.utility.alert('משתמש נותק בהצלחה')
        localStorage.clear()

      });
  }

  ngOnInit() {
    const sub = this.http
      .get<UserStatus>('http://localhost:3000/login-status', { withCredentials: true, })
      .subscribe((data) => {
        if(data.visit >= 500)
          {this.utility.alert("משתמש נחסם עקב פעילות לא מותרת")
          this.router.navigate(['login']);

        }
        if (data.status === 'error') {
         
        } else if (data.status === 'loggedin') {
          
          this.utility.user = data.user;
          let mper = JSON.stringify(data.user.managerPermission)
          let aper = JSON.stringify(data.user.admin)
          let uid = JSON.stringify(data.user.id)
          localStorage.setItem("mper", mper);
          localStorage.setItem("aper", aper);
          localStorage.setItem("uid", uid);
         



        }


        sub.unsubscribe();
      });

    this.utility.setGlobalStyling();






    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res) {
        if (this.utility.user) {

        const sub = this.http
          .post<void>('http://localhost:3000/logout', this.utility.user, { withCredentials: true, })
          .subscribe(() => {
            this.utility.user = undefined;
            this.utility.isConnected = false
            this.router.navigate(['']);
            sub.unsubscribe();

            this.utility.alert('משתמש נותק עקב חוסר פעילות')

            localStorage.clear()
          })
        }
        
      }
    });
  }
}


export interface UserLoggedin {
  id: number;
  fullName: string;
  email: string;
  admin: boolean;
  managerPermission: boolean;
  isConnected?: boolean
 
  resetPass:boolean
  resetCode:any
}
export interface UserStatus {
  status: 'loggedin' | 'error';
  visit:number
  user: UserLoggedin;
  message?: string;
  admin: boolean;
  managerPermission?: boolean;

}

