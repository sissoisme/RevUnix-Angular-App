import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.scss']
})
export class NewpassComponent {
  user: any = this.utility.user

  constructor(public utility: UtilityService, private http: HttpClient,private router:Router) {

  }
 

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]
     ),
     checkedPassword: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
  });

  send() {
  
    if (this.form.value.password == this.form.value.checkedPassword) {
      this.user.password = this.form.value.password
      this.user.resetCode = ""
      this.user.resetPass = ""
      const sub = this.http
      

        .post<void>('http://localhost:3000/updateUser', this.user, {
          withCredentials: true,
        })
        .subscribe(() => {
          this.user.isEditState = false;
          sub.unsubscribe();
        });
        this.utility.alert('סיסמה שונתה בהצלחה')
        this.router.navigate(['login']);

    }else{ this.utility.alert(' הסיסמאות אינם תואמות  ')}

  }



}
