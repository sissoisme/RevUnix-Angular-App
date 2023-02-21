import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from '../rev-display/rev-display.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-likelist',
  templateUrl: './all-likes-list.component.html',
  styleUrls: ['./all-likes-list.component.scss']
})
export class LikelistComponent {
  searchVal: string;
likes:Like[] =[]


sort(dir: boolean, val: number) {

  if (val == 1)
    this.likes.sort(this.comper);
  if (val == 2)
    this.likes.sort((a, b,) => JSON.stringify(a.revId).localeCompare(JSON.stringify(b.revId)));
  if (val == 3)
    this.likes.sort((a, b,) => JSON.stringify(a.userId).localeCompare(JSON.stringify(b.userId)));

  if (val == 4)
    this.likes.sort((a, b,) => JSON.stringify(a.creatTime).localeCompare(JSON.stringify(b.creatTime)));
  if (dir)
    this.likes.reverse()
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
delete(r: any) {
  let idToRemove = r

  const sub2 = this.http.delete<void>(`http://localhost:3000/likes/${idToRemove}`, {
    withCredentials: true,
  }).subscribe(() => {

    sub2.unsubscribe();
    this.utility.alert('ביקרות נמחקה מהרשימה בהצלחה')
    setInterval(resetpage, 1000)
    function resetpage() {
      window.location.reload()
    }
  })
}









  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {
 
  }

  ngOnInit() {

const sub = this.http
        .get<any>('http://localhost:3000/likes', {
          withCredentials: true,
        })
        .subscribe((data) => {
          this.likes = data;
          sub.unsubscribe();
        })

       } 

}




