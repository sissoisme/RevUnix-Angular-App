import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input()
  value : string | number = 60;
  @Input()
  min: number = 20;
  @Input()
  max: number = 60;

   
  @Output()
  valueChange = new EventEmitter;
  

  change() {
    this.valueChange.emit(this.value)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
