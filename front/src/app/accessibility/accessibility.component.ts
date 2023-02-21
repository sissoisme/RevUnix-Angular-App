import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utillity.service';
import { Setting } from './accessibility.interface';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  settings: Setting[] = [
    { field: 'level', title: 'רמת בהירות', value: 100, min: 20, max: 100 },
    { field: 'fontSize', title: 'גודל טקסט', value: 10, min: 10, max: 50 },
    { field: 'margin', title: 'ריווח פנימי של האתר', value: 0, min: 0, max: 10 },
    { field: 'letterSpacing', title: 'ריווח של האותיות', value: 0, min: 0, max: 5 },
  ];

  brightnessLevel: number = 90
  fontSize: number = 10
  change(item: Setting, val: number) {
    item.value = val;
    localStorage[item.field] = val;
    this.utility.setGlobalStyling();}

  constructor(private utility: UtilityService) { }

  ngOnInit(){
    this.settings.forEach(x => {
      if (localStorage[x.field]) 
      {x.value = +localStorage[x.field];
      }});
      

    }
  
}
