
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStatus } from '../app.component';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-userplace',
  templateUrl: './userplace.component.html',
  styleUrls: ['./userplace.component.scss']
})
export class UserplaceComponent {
  mper= localStorage.getItem('mper')
   uid =localStorage.getItem('uid')
   showAddOns = false

  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {
   
  }


  ngOnInit() {
if(this.mper=='true')
this.showAddOns = true
    
  }
}
