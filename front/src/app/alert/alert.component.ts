import { Component,  OnInit } from '@angular/core';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public utility: UtilityService) { 
    
  }

  ngOnInit(): void {
  }

}
