import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilityService } from '../utillity.service';
import { Menu } from './navbar.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  active: string = '';

  menu: Menu[] = [
    { route: '/', title: 'בית' ,icon: 'home'},
    { route: '/about', title: 'אודות' ,icon: 'info-circle'},
    { route: '/rev-disp', title: 'כל הביקורות ',icon: 'list'}, 
    { route: '/user-place', title: 'אזור אישי',isConnected : true ,icon: 'id-card-o'}, 
    { route: '/accessibility', title: 'נגישות',icon: 'wheelchair'}, 
    { route: '/support', title: 'צור קשר',icon: 'envelope'}, 
    
  ]
  constructor(public utility :UtilityService,private router:Router){this.router.events.subscribe(ev => {
    if (ev instanceof NavigationEnd) {
      this.active = ev.url
   
      
    }
  });}

  ngOnInit() {



  }
}