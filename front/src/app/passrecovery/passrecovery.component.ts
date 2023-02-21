import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.component.html',
  styleUrls: ['./passrecovery.component.scss']
})
export class PassrecoveryComponent {

  @ViewChild('userEmail')
  emailElem: ElementRef<HTMLInputElement>

  form: FormGroup = new FormGroup({

    email: new FormControl('', [
      Validators.required, Validators.minLength(5),Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)])

  })
  constructor(private utility: UtilityService, private router: Router, private http: HttpClient) {

  }

  send() {
    const uEmail = this.emailElem.nativeElement.value
    const body = [uEmail]


    const sub = this.http

      .post<void>('http://localhost:3000/passrecover', body, {
        withCredentials: true,
      })
      .subscribe(() => {
        sub.unsubscribe();
      });


    this.utility.alert(' נשלחה בקשה לשרת')
    this.router.navigate(['login']);
  }


}