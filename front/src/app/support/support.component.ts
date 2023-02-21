
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { UtilityService } from '../utillity.service';
import { Support } from './support.interface';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {

 
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    email: new FormControl('', [Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/), Validators.email]),

    content: new FormControl('', [
      Validators.required, Validators.minLength(10),
      Validators.maxLength(250),
    ]),
  });




  send() {
    
    const sub = this.http
      .post<void>('http://localhost:3000/support', this.form.value,{
        withCredentials: true,
      })
      .subscribe(() => {
        this.utility.alert('הטופס נשלח בהצלחה!');
        sub.unsubscribe();
        this.router.navigate(['']);
      });
  }

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
