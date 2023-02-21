import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users.interface';
import { UtilityService } from '../utillity.service';
import { compare, hash } from 'bcrypt';
@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent {

  users: User[] = [];
  searchVal: string;
editPass= false

  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {
 
  }


  


  update(user: User) {
   
    const sub = this.http
      .post<void>('http://localhost:3000/updateUser', user,{
        withCredentials: true,
      })
      .subscribe(() => {
        user.isEditState = false;
        sub.unsubscribe();
      });
  }


  sort(dir: boolean, val: number) {

    if (val == 1)
      this.users.sort(this.comper);
    if (val == 2)
      this.users.sort((a, b,) => a.fullName .localeCompare(b.fullName));
    if (val == 3)
      this.users.sort((a, b,) => a.password.localeCompare(b.password));
    if (val == 4)
      this.users.sort((a, b,) => a.email.localeCompare(b.email));
    if (val == 5)
      this.users.sort((a, b,) => JSON.stringify(a.managerPermission) .localeCompare(JSON.stringify(b.managerPermission) ));
    if (val == 6)
      this.users.sort((a, b,) => JSON.stringify(a.isConnected).localeCompare(JSON.stringify(b.isConnected)));
    if (dir)
      this.users.reverse()
  }


  
  


  comper(a: any, b: any,) {
    const nameA = a.id;
    const nameb = b.id;
    let comparison = 0;
    if (nameA > nameb) {
      comparison = 1;
    } else if (nameA < nameb) {
      comparison = -1;
    }
    return comparison;
  }

  remove(item: User) {
    if (!confirm('האם למחוק את המשתמש?')) {
      return;
    }

    const sub = this.http.delete<void>(`http://localhost:3000/users/${item.id}`,{
      withCredentials: true,
    }).subscribe(() => {
      const i = this.users.findIndex((x) => x.id == item.id);
      this.users.splice(i, 1);
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.utility.loader
    const sub = this.http
      .get<any>('http://localhost:3000/users', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.users = data;
        sub.unsubscribe();
       
      });
  }
}
