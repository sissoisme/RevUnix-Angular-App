import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../user-manage/users.interface';
import { UtilityService } from '../utillity.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(40)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)] ),
    password: new FormControl('', [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])
    
    
  });

  send() {
   
   let  data = this.form.value
   
   
    const sub = this.http
      .post<User>('http://localhost:3000/register',this.form.value,{
        withCredentials: true,
      })
      .subscribe((data) => {
        if (!data){

          return this.utility.alert(' משתמש קיים  ')
        }
        this.utility.alert('משתמש נרשם בהצלחה')
        sub.unsubscribe();
        this.router.navigate(['login']);
        
      });
  }
  constructor(
    private http: HttpClient, private utility: UtilityService ,private router: Router
  ) {}

  ngOnInit(): void {}
}