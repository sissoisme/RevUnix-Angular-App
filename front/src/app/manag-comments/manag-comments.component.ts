import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../utillity.service';
import { Comment } from '../rev-display/rev-display.interface';
@Component({
  selector: 'app-manag-comments',
  templateUrl: './manag-comments.component.html',
  styleUrls: ['./manag-comments.component.scss']
})
export class ManagCommentsComponent {
  mper = localStorage.getItem('mper')
  uid = localStorage.getItem('uid')
  showAddOns = false

  searchVal: string;
  comments: Comment[] = [];
  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {

  }
  ksks(){
    console.log(this.comments);
  }

  update(client: Comment) {

    if (
      client.title.length > 30 || client.title.length < 3
    ) {
      return this.utility.alert('כותרת צריכה להיות בין 3 ל 30 תווים')
    } else if (client.body.length > 80 || client.body.length < 6
    ) {
      return this.utility.alert('תוכן צריך להיות בין 6 ל 80 תווים')
    }else{
      const sub = this.http
        .put<void>('http://localhost:3000/comments', client, {
          withCredentials: true,
        })
        .subscribe(() => {
          client.isEditState = false;
          sub.unsubscribe();
        });
    }
  }



  sort(dir: boolean, val: number) {

    if (val == 1)
      this.comments.sort(this.comper);
    if (val == 2)
      this.comments.sort((a, b,) => JSON.stringify(a.userId).localeCompare(JSON.stringify(b.userId)));
    if (val == 3)
      this.comments.sort((a, b,) => JSON.stringify(a.revId).localeCompare(JSON.stringify(b.revId)));
    if (val == 4)
      this.comments.sort((a, b,) => JSON.stringify(a.title).localeCompare(JSON.stringify(b.title)));
    if (val == 4)
      this.comments.sort((a, b,) => a.body.localeCompare(b.body));
    if (val == 5)
      this.comments.sort((a, b,) => a.creatTime.localeCompare(b.creatTime));
    if (dir)
      this.comments.reverse()
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
  delete(l: any) {
    let idToRemove = l

    const sub2 = this.http.delete<void>(`http://localhost:3000/likes/${idToRemove}`, {
      withCredentials: true,
    }).subscribe(() => {

      sub2.unsubscribe();
      this.utility.alert('תגובה נמחקה בהצלחה')
      setInterval(resetpage, 1000)
      function resetpage() {
        window.location.reload()
      }
    })
  }
  ngOnInit() {
    this.utility.loader(true)
    if (this.mper == "true") { this.showAddOns = true }
    let body = [localStorage.getItem('uid')]
    if (this.mper == 'true') {
      const sub = this.http
        .get<any>('http://localhost:3000/comments', {
          withCredentials: true,
        })
        .subscribe((data) => {
          this.comments = data;
          sub.unsubscribe();
          this.utility.loader(false)
        });
    } else {
      this.utility.loader(true)
      const sub = this.http
        .post<any>('http://localhost:3000/comments/mycomments', body, {
          withCredentials: true,
        })
        .subscribe((data) => {
          this.comments = data;
          sub.unsubscribe();
          this.utility.loader(false)
        });
    }
  }
}
