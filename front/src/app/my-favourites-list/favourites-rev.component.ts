import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from '../rev-display/rev-display.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-favourites-rev',
  templateUrl: './favourites-rev.component.html',
  styleUrls: ['./favourites-rev.component.scss']
})
export class FavouritesRevComponent {

  reviews: Review[] 
  searchVal: string;

  uid =localStorage.getItem('uid')
  showAddOns = false
  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {
    this.uid =localStorage.getItem('uid')
  }
  
  sort(dir: boolean, val: number) {

    if (val == 1)
      this.reviews.sort(this.comper);

    if (val == 2)
      this.reviews.sort((a, b,) => a.title.localeCompare(b.title));
    if (val == 3)
      this.reviews.sort((a, b,) => a.subTitle.localeCompare(b.subTitle));
    if (val == 4)
      this.reviews.sort((a, b,) => a.topic.localeCompare(b.topic));
    if (val == 5)
      this.reviews.sort((a, b,) => a.category.localeCompare(b.category));
    if (val == 6)
      this.reviews.sort((a, b,) => a.rate.localeCompare(b.rate));
    if (dir)
      this.reviews.reverse()
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

  displayInBox(x:any){
    this.utility.BoxDispaly(x)
    
  }

  delete(r: any) {
    let uid:any = localStorage.getItem('uid')
     let numUid =parseInt(uid)
    let body =[numUid,r]
    const sub2 = this.http.post<void>(`http://localhost:3000/likes/deletMyLike`,body, {
      withCredentials: true,
    }).subscribe(() => {

      sub2.unsubscribe();
      this.utility.alert('ביקורת הוסרה מהרשימה ')
      setInterval(resetpage, 1000)
      function resetpage() {
        window.location.reload()
      }
    })
  }

  ngOnInit() {
    if(this.uid=="1"||this.uid=="2")
 this.showAddOns = true
    let body = [localStorage.getItem('uid')]
    const sub = this.http
      .post<any>(`http://localhost:3000/fav`, body, { withCredentials: true, })
      .subscribe((data) => {
     
        this.reviews = data;
        sub.unsubscribe();
      });
      
      
  
  }
}