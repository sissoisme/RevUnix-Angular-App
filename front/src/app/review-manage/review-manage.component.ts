import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Review } from '../rev-display/rev-display.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-review-manage',
  templateUrl: './review-manage.component.html',
  styleUrls: ['./review-manage.component.scss']
})
export class ReviewManageComponent {
  mper =localStorage.getItem('mper')
  uid =localStorage.getItem('uid')
  
  showAddOns = false
  show: boolean = false
  reviews: Review[] = [];
  searchVal: string;
  newReview: Review = {
    displayStatus: false,
    id: null,
    topic: '',
    title: '',
    category: '',
    subTitle: '',
    body: '',
    rate: '',
    length: '',
    releaseYear: 0,
    tags: '',
    imgUrl: '',
    imgFile: '',
    bookPublisher: '',
    bookPages: '',
    bookAuthor: '',
    tvEpisode: '',
    tvSeries: '',
    authorId: null


  };

  displayInBox(x:any){
    this.utility.BoxDispaly(x)
    
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


  createNew(x: string) {
    this.utility.reviewTopic = x
    this.router.navigate(['input-manage']);
  }

  async add() {


    this.newReview.author = this.utility.user?.fullName


    const sub = this.http
      .post<Review>('http://localhost:3000/reviews', this.newReview, {
        withCredentials: true,
      })
      .subscribe((data) => {

        this.reviews.unshift(data);
        this.newReview = {
          displayStatus: false,
          id: null,
          topic: '',
          title: '',
          category: '',
          subTitle: '',
          body: '',
          rate: '',
          length: '',
          releaseYear: 0,
          tags: '',
          imgUrl: '',
          imgFile: '',
          bookPublisher: '',
          bookPages: '',
          bookAuthor: '',
          tvEpisode: '',
          tvSeries: '',
          authorId: null



        };
        sub.unsubscribe();
      });
  }
  edit(item: Review) {
    this.router.navigate(['input-manage', item.id]);
  }

  delete(r: any) {
    if(event){

      event.stopPropagation();
    }
    if (!confirm(`האם למחוק את ${r.id}?`)) {
      return;
    }

    const sub = this.http
      .delete<void>(`http://localhost:3000/reviews/${r.id}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        const i = this.reviews.findIndex((x) => x.id === r.id);
        this.reviews.splice(i, 1);
        this.utility.alert('ביקורת נמחקה בהצלחה')
        sub.unsubscribe();
      });
  }
  constructor(public utility: UtilityService, public http: HttpClient, private router: Router) {
  }
  ngOnInit() {


 if(this.mper=="true")
 this.showAddOns = true
     
   
    let body = [localStorage.getItem('uid')]
    if (this.mper == 'true') {
      const sub = this.http
        .get<any>('http://localhost:3000/reviews/', {
          withCredentials: true,
        })
        .subscribe((data) => {
          this.reviews = data;
          sub.unsubscribe();
        });
    } else {
      const sub = this.http
        .post<any>('http://localhost:3000/reviews/myreviews', body, {
          withCredentials: true,
        })
        .subscribe((data) => {
          this.reviews = data;
          sub.unsubscribe();
        });
    }
  }
}