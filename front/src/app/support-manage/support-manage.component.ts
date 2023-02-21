import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Support } from '../support/support.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-support-manage',
  templateUrl: './support-manage.component.html',
  styleUrls: [
    './support-manage.component.scss'
    
  ],
})
export class SupportManageComponent implements OnInit {
  support: Support[]
  uid =localStorage.getItem('uid')
  showAddOns = false
  searchVal: string;
  isStatusDone: boolean = false;
  
  
  sort(dir: boolean, val: number) {

    if (val == 1)
      this.support.sort(this.comper);
    if (val == 2)
      this.support.sort((a, b,) => JSON.stringify(a.id) .localeCompare(JSON.stringify(b.id)));
    if (val == 3)
      this.support.sort((a, b,) => a.fullName.localeCompare(b.fullName));
    if (val == 4)
      this.support.sort((a, b,) => a.email.localeCompare(b.email));
    if (val == 5)
      this.support.sort((a, b,) => a.phone.localeCompare(b.phone));
    if (val == 6)
      this.support.sort((a, b,) => a.content.localeCompare(b.content));
    if (dir)
      this.support.reverse()
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
  update(support: Support) {
    
    
    const sub = this.http
      .put<void>('http://localhost:3000/support/update', support,{
        withCredentials: true,
      })
      .subscribe(() => {
        support.isEditState = false;
        sub.unsubscribe();
      });
  }

  remove(item: Support) {
    if (!confirm('האם למחוק את הפנייה?')) {
      return;
    }

    const sub = this.http.delete<void>(`http://localhost:3000/support/${item.id}`,{
      withCredentials: true,
    }).subscribe(() => {
      const i = this.support.findIndex((x) => x.id == item.id);
      this.support.splice(i, 1);
      sub.unsubscribe();
    });
  }

  complete(item: Support) {
    if (!confirm('האם לסגור את הפנייה?')) {
      return;
    }

    const sub = this.http.put<void>(`http://localhost:3000/support/complete`, item,{
      withCredentials: true,
    }).subscribe(() => {
      const i = this.support.findIndex((x) => x.id == item.id);
      this.support.splice(i, 1);
      sub.unsubscribe();
    });
  }
  undo(item: Support) {
    if (!confirm('לפתוח פנייה מחדש?')) {
      return;
    }

    const sub = this.http.put<void>(`http://localhost:3000/support/undo`, item,{
      withCredentials: true,
    }).subscribe(() => {
      const i = this.support.findIndex((x) => x.id == item.id);
      this.support.splice(i, 1);
      sub.unsubscribe();
    });
  }

  constructor(
    private http: HttpClient,
    public utility: UtilityService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((ev) => {
      if (ev['status'] === 'completed') {
        this.isStatusDone = true;
        const sub = this.http
          .get<Support[]>('http://localhost:3000/support/completed',{
            withCredentials: true,
          })
          .subscribe((data) => {
            this.support = data;
            sub.unsubscribe();
          });
      } else {
        this.isStatusDone = false;
        const sub = this.http
          .get<Support[]>('http://localhost:3000/support/opened',{
            withCredentials: true,
          })
          .subscribe((data) => {
            this.support = data;
            sub.unsubscribe();
          });
      }
    });
  }

  ngOnInit() {
    if(this.uid=="1")
    {this.showAddOns = true}
  }
}



