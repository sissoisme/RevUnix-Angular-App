import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Review } from '../rev-display/rev-display.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-carousel-templet',
  templateUrl: './carousel-templet.component.html',
  styleUrls: ['./carousel-templet.component.scss']
})
export class CarouselTempletComponent {
  constructor(private http:HttpClient,public utilitiyservice:UtilityService) {}
  reviews: Review[] = [];



  ngOnInit() {
    const sub =this.http
      .get<any>('http://localhost:3000/reviews',{
        withCredentials: true,
      })
      .subscribe((data) => {
        this.reviews = data;
     
        
        let leng = this.reviews.length
        this.reviews.reverse()
        for( let i = leng; i>5 ;i--)
        {this.reviews.splice(0,1)}
        this.reviews.reverse()
        sub.unsubscribe();
      });
  }

}


