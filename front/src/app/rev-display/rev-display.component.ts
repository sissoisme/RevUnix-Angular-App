import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { UtilityService } from '../utillity.service';
import { Like, Review } from './rev-display.interface';
import { Comment } from './rev-display.interface';


@Component({
  selector: 'app-rev-display',
  templateUrl: './rev-display.component.html',
  styleUrls: ['./rev-display.component.scss'],
})
export class RevDisplayComponent implements OnInit {
  constructor(private http: HttpClient, public utility: UtilityService, private router: Router,) {
  
   }
  comment: Comment
  searchVal: string;
  likes: Like[]
  reviews: Review[] = [];
  comments: Comment[]
  stamlist = [1, 2]
  status: Boolean = true;
  addCommentfield: number | boolean
  counter: number = 2
  protectedList: any[] = []
  productsPerPage: number = 3;
  public selectedPage = 1
  products: any[] = []
 rosh="#collapseExample"

  @ViewChild('sorter')
  sorterElem: ElementRef<HTMLSelectElement>;
  
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30),] ),
    body: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(80),]),
  });
  
  displayInBox(x:any){
    this.utility.BoxDispaly(x)
    
  }
  checkLikes(likes: any, revid: any,) {
    let counter = 0
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].revId == revid) counter++;
    }
    return counter
  }
  stopProp(){
    if(event){

      event.stopPropagation();
    }
  }

  checkIfCanSend(likes: any, x: any) {
   if(event){

     event.stopPropagation();
   }
 
    let canSend = true
    if (!this.utility.user?.id)
      return this.utility.alert('עלייך להתחבר בכדי לשלוח לייק')
    else {

      for (let i = 0; i < likes.length; i++) {
        if (likes[i].userId == this.utility.user?.id && likes[i].revId == x) {
          let idToRemove = likes[i].id

          canSend = false
          i == likes.length
          if (!confirm('האם לבטל השמירה?')) {
            return;
          } else {
            const sub = this.http.delete<void>(`http://localhost:3000/likes/${idToRemove}`, {
              withCredentials: true,
            }).subscribe(() => {

              sub.unsubscribe();
              return 
            });
          }

          this.utility.alert('לייק נמחק הצלחה !')
          setInterval(resetpage, 1000)
          function resetpage() {
            window.location.reload()
          }
        }
      }
      if (canSend) {
        let likeForm = {
          id: null,
          userId: this.utility.user?.id,
          revId: x,
          creatTime: new Date().toUTCString()


        }

        const sub = this.http
          .post<Comment>('http://localhost:3000/likes', likeForm, {
            withCredentials: true,
          })
          .subscribe((data) => {
          
            sub.unsubscribe();
          })
        this.utility.alert('לייק נוצר הצלחה !')
        setInterval(resetpage, 1000)
        function resetpage() {
          window.location.reload()
        }
        return;
      }
    }
  }

  sort() {
    let body = [this.sorterElem.nativeElement.value]

    const sub = this.http
      .post<any>(`http://localhost:3000/reviews/sorter`, body, {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        this.products = data;

        sub.unsubscribe();
      });
  }

  filter(content: any, parameter: any) {
    let body = [content, parameter]
    const sub = this.http
      .post<any>(`http://localhost:3000/reviews/filter`, body, {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        this.products = data;

        sub.unsubscribe();
      });
  }
  openComments(){
    if(event){

      event.stopPropagation();

    }
  }

  addComment(x: any) {
    if(event){
      event.stopPropagation();
    }
    if (this.addCommentfield) {
      this.addCommentfield = false
    } else {
     if (!this.utility.user?.id) { this.utility.alert("עלייך להיות מחובר בשביל לשלוח תגובה") }
      else {
        this.addCommentfield = x

      }
    }
  }

  getLikes(a: any, b: any,) {
    a.forEach((elem: { revId: any; }) => {
      if (b == elem.revId) this.counter++
    })
  }



  async sendComment(x: any) {
    if(event){
      event.stopPropagation();
    }
    const commentForm: Comment = this.form.value
    commentForm.revName = x.title
    commentForm.creatTime = new Date().toUTCString()
    commentForm.revId = x.id
    commentForm.userName = this.utility.user?.fullName
    commentForm.userId = this.utility.user?.id
 

    const sub = this.http
      .post<Comment>('http://localhost:3000/comments', commentForm, {
        withCredentials: true,
      })
      .subscribe((data: any) => {
     
        sub.unsubscribe();
      }
      )

    this.addCommentfield = false
    window.location.reload();
  }

  reset() {
    const sub = this.http
      .get<any>('http://localhost:3000/reviews/', {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        this.products = data;
        this.products.forEach((element: { displayStatus: boolean; }) => {
          element.displayStatus = true;
        });

        sub.unsubscribe();
      });
  }

  ngOnInit() {
    
    const sub = this.http.get<Review[]>('http://localhost:3000/reviews/', { withCredentials: true, })
      .subscribe((data: Review[]) => {
       this.products= data
       this.protectedList = data
       
       this.productsPerPage = Number("3");
        this.reviews.forEach((element: { displayStatus: boolean; }) => {
          element.displayStatus = true;
        });
        sub.unsubscribe();
      });
    const sub2 = this.http.get<Comment[]>('http://localhost:3000/comments', { withCredentials: true, })
      .subscribe((data2: Comment[]) => {
        this.comments = data2


        sub2.unsubscribe();
      });
    const sub3 = this.http.get<Like[]>('http://localhost:3000/likes', { withCredentials: true, })
      .subscribe((data3: Like[]) => {
        this.likes = data3


        sub3.unsubscribe();
      });

    let pageIndex = (this.selectedPage - 1) * this.productsPerPage
    this.products = this.reviews.slice(pageIndex, this.productsPerPage)
    this.productsPerPage = 3;
  }
  changePageSize(event: Event) {

    const newSize = (event.target as HTMLInputElement).value
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.protectedList.length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts() {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    let endIndex = (this.selectedPage - 1) * this.productsPerPage + this.productsPerPage;
    this.products = []
    this.products = this.protectedList.slice(pageIndex, endIndex)
  }
  
}






