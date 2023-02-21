import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from '../rev-display/rev-display.interface';
import { UtilityService } from '../utillity.service';

@Component({
  selector: 'app-input-manage',
  templateUrl: './input-manage.component.html',
  styleUrls: ['./input-manage.component.scss']
})
export class InputManageComponent implements OnInit {
  sub: Subscription;
  review: Review;
  alternativImg: any
  fileName = '';
  counter = 0
  @ViewChild('imageInput')
  inputElem: ElementRef<HTMLInputElement>

  imgType: any
  @ViewChild('imgTypeElem')
  imgElem: ElementRef<HTMLSelectElement>

  tags = [
    { id: 1, value: "אימה", check: false },
    { id: 2, value: "אנימציה", check: false },
    { id: 3, value: "היסטורי", check: false },
    { id: 4, value: "מד''ב", check: false },
    { id: 5, value: "פנטזיה", check: false },
    { id: 6, value: "מדע וטבע", check: false },
    { id: 7, value: "ילדים", check: false },
    { id: 8, value: "אקשן", check: false },
    { id: 9, value: "מתח", check: false },
    { id: 10, value: "רומנטי", check: false },
    { id: 11, value: "ספורט", check: false },
    { id: 12, value: "קומדיה", check: false },
    { id: 13, value: "תיעודי", check: false },
    { id: 14, value: "פשע", check: false },
    { id: 15, value: "ביוגרפיה", check: false },
    { id: 16, value: "משפחה", check: false },
    { id: 17, value: "פופולארי", check: false },
    { id: 18, value: "נוסטלגי", check: false },

  ]
  tagsSelected: string = ''


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

  form: FormGroup
  buildForm(item: Review) {
    this.form = new FormGroup({
      topic: new FormControl(item.topic,[Validators.required]),
      title: new FormControl(item.title,[Validators.required,Validators.minLength(2),Validators.maxLength(40)])
      , category: new FormControl(item.category,[Validators.required])
      , subTitle: new FormControl(item.subTitle,[Validators.required,Validators.minLength(5),Validators.maxLength(300)])
      , body: new FormControl(item.body,[Validators.required,Validators.minLength(10),Validators.maxLength(900)])
      , rate: new FormControl(item.rate,[Validators.required])
      , length: new FormControl(item.length,[Validators.maxLength(4)])
      , releaseYear: new FormControl(item.releaseYear,[Validators.required])
      , tags: new FormControl(item.tags,)
      , imgUrl: new FormControl(item.imgUrl,)
      , imgFile: new FormControl(item.imgFile,)
      , bookPublisher: new FormControl(item.bookPublisher,[Validators.maxLength(20)])
      , bookPages: new FormControl(item.bookPages,[Validators.maxLength(4)])
      , bookAuthor: new FormControl(item.bookAuthor,[Validators.maxLength(20)])
      , tvEpisode: new FormControl(item.tvEpisode,[Validators.maxLength(3)])
      , tvSeries: new FormControl(item.tvSeries,[Validators.maxLength(2)])

    });
  }

  imgError(image: any) {
    image.onerror = "";
    image.src = "../../assets/imgs/defualtImg.jpg";
    return true;
  }
  getTags(tag: any) {
    let display: any = document.getElementById('tagsDis')
    let result;
    if (!tag.check) {
      tag.check = true
      this.counter++
      this.tagsSelected += `${tag.value}, `;
    } else {
      this.counter--
      tag.check = false

      result = this.tagsSelected.replace(`${tag.value}, `, "")
      this.tagsSelected = result
    }
    display.value = this.tagsSelected
  }
  selectImg() {
    this.inputElem.nativeElement.click()
  }
  imageChange() {
    const files = this.inputElem.nativeElement.files
    if (files?.length) {
      const reader = new FileReader();

      reader.onload = (ev) => {
        this.alternativImg = ev.target?.result


      }
      reader.readAsDataURL(files[0])
    }
  }
  imgTypeChose() {
  
    if (this.imgElem.nativeElement.value)
      this.imgType = true
    else {
      this.imgType = false
    }
  }

  GoBack() {
    this.router.navigate(['user-place']);
  }
  async send() {
    if (this.alternativImg) { this.review.imgFile = this.alternativImg }
    this.review.tags = this.tagsSelected
    if (!this.review.author) {
      this.review.author = this.utility.user?.fullName;
      this.review.authorId = this.utility.user?.id;
    }

    this.review.publishedTime = new Date().toUTCString()
    const sub = this.http
      .post<Review>('http://localhost:3000/reviews', this.review, {
        withCredentials: true,
      })
      .subscribe((data) => {
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

    if (this.newReview.id) {
      this.utility.alert('ביקורת נערכה בהצלחה',)
      this.router.navigate(['user-place']);
      setInterval(resetpage, 1000)
      function resetpage() {
        window.location.reload()
      }
    } else {
      this.utility.alert('ביקורת נוספה בהצלחה')
      this.router.navigate(['user-place']);
      setInterval(resetpage, 1000)
      function resetpage() {
        window.location.reload()
      }
    }
  }
  constructor(public http: HttpClient, private route: ActivatedRoute, private utility: UtilityService, private router: Router) {
    this.sub = this.route.params.subscribe(data => {
      const id = data['id'];
      if (id) {
        const sub = this.http.get<Review>(`http://localhost:3000/reviews/${id}`, { withCredentials: true, }).subscribe(data => {
          this.review = data;
          this.buildForm(this.review)
          sub.unsubscribe()
        });
      } else {
        this.review = {
          displayStatus: false,
          id: 0,
          topic: this.utility.reviewTopic || 'Movies',
          author: '',
          status: '',
        
          publishedTime: '',
          category: '',
          title: '',
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
        this.buildForm(this.review)
      }
    });
  }
  ngOnInit() {
  }
}
