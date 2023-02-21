
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { UtilityService } from '../utillity.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  attamps = 0

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/),
    Validators.maxLength(30), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
  });

  send() {
    if (this.utility.user?.id) {
      return this.utility.alert('משתמש כבר מחובר ')
    }

    const sub = this.http
      .post<any>('http://localhost:3000/login', this.form.value, {
        withCredentials: true,
      })

      .subscribe(data => {
        if (data == undefined) {
          return this.utility.alert('שם משתמש וסיסמא שגויים')
        }
        
        this.utility.user = data
        if (data.resetPass && this.form.value.password == data.resetCode) {
          this.router.navigate(['newpass']);
          sub.unsubscribe();
          return
        }
        this.utility.user = data
        let mper = JSON.stringify(data.managerPermission)
        let uid = JSON.stringify(data.id)
        localStorage.setItem("mper", mper);
        localStorage.setItem("uid", uid);
        this.utility.managerPermission = data.managerPermission
        this.utility.admin = data.admin
        this.utility.alert('משתמש התחבר בהצלחה')
      
        this.router.navigate(['rev-disp']);
        sub.unsubscribe();
      });
  }
  constructor(
    private http: HttpClient,
    private utility: UtilityService,
    private router: Router,
    private bnIdle: BnNgIdleService

  ) { }

  ngOnInit(): void { }
}