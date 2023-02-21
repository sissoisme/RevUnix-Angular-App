

export interface Review {
    displayStatus:boolean;
    id: number | null;
    topic: string;
    status?: string;
    author?: string;
    authorId: any;
  
    publishedTime?: any
    title: string;
    category: string;
    subTitle: string;
    body: string;
    rate: string;
    length?:string;
    releaseYear: number | string;
    tags?: string;
    imgUrl?: string;
    imgFile?: any;
    bookPublisher?: string;
    bookPages?: string;
    bookAuthor?: string;
    tvEpisode?: string;
    tvSeries?: string;
    
   
    
    

}
export interface Comment {
        id: any;
        revName:any;
      revId: any;
      userId?: any;
      userName?: any;
      title:any;
      body:any;
      creatTime:any;
      isEditState:any
  
}

export interface Like {
id: number | null;
revId: any;
userId?: number

creatTime:string | Date
}
