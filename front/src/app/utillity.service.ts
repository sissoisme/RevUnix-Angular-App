import { Injectable } from '@angular/core';
import { UserLoggedin } from './app.component';
import { Like, Review } from './rev-display/rev-display.interface';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {
  isAlertActived: boolean = false;
  alertText: string = '';
  isBoxActived: boolean = false;
  BoxContent: any;


  user?: UserLoggedin;
  reviewTopic: string;
  managerPermission: boolean
  admin: boolean;
  isConnected: boolean
  isLoader: boolean = false;
  favList: any
  favListShow: boolean = true

  loader(isStart: boolean) {
    this.isLoader = isStart;
    document.body.style.overflow = isStart ? 'hidden' : 'initial';
  }



  alert(txt: string) {
    this.alertText = txt;
    this.isAlertActived = true;
  }
  BoxDispaly(txt: string) {
    this.BoxContent = txt;
    this.isBoxActived = true;
  }

  setGlobalStyling() {
    for (const key in localStorage) {
      const val = localStorage[key];
      if (key == 'level') {
        document.body.style.filter = `brightness(${val}%)`;
       
        // document.body.style.background = ` -webkit-linear-gradient(left,  hsla(0, 1%, 60%,${val}%),hsla(0, 0%, 100%, ${val}%), hsla(0, 1%, 60%, ${val}%)) ` 
        document.body.style.background= `-webkit-linear-gradient(left,  hsl(0, 0%, ${val-25}%),hsl(0, 0%, ${val}%), hsl(0, 0%,${val-25}%)) `;
        // document.body.style.background = `hsla(0, 0%,${val}%,100% )`;
      }
      else if (key == 'fontSize') { document.body.style.fontSize = (1 + val / 50) + 'em'; }
      else if (key == 'margin') { document.body.style.margin = `0 ${val}rem`; }
      else if (key == 'letterSpacing') { document.body.style.letterSpacing = val + 'px'; }
    }
  }


  constructor() { }
}
