import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-box-display-reviews',
  templateUrl: './box-display-reviews.component.html',
  styleUrls: ['./box-display-reviews.component.scss']
})
export class BoxDisplayReviewsComponent implements OnInit{
  constructor(public utility: UtilityService) { }
thatReview :any

  ngOnInit(): void {
  }

}

