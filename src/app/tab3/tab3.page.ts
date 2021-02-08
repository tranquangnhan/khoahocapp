import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataApiService } from '../data-api.service';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import * as yt from 'ionic-youtube-streams';
import { StreamingMedia,StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public allVideo = {};
  public allVideoId;
  public oneVideoId;
  key = environment.keyYoutube;
  url: string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=';
  urlBE = 'http://khoahocnhan.herokuapp.com/';
  constructor(
    private dataVid: DataApiService,
    private http: HttpClient,
    private youtube: YoutubeVideoPlayer,
    private readonly streamingMedia:StreamingMedia,
    private readonly route: Router
  ) { }

  ngOnInit() {
    this.getVideo()
  }
  
  public getVideo() {

    let IDKhoa = {};

    this.dataVid.setValueIdClass(localStorage.getItem('idclass').toString());
    this.dataVid.setValueIdSubject(localStorage.getItem('idsubject').toString());

    this.dataVid.getToDo().subscribe(data => {

      try {
        if (data.data !== 'undefined') {
          (data.data).forEach(Item => {
            IDKhoa = Item['idkhoayt'];
          });
          this.getAllVideo(IDKhoa);
        }
      } catch (err) { }

    });
  }

  getAllVideo(idkhoayt): any {
    this.allVideoId = idkhoayt;
    this.http.get(this.url + idkhoayt + "&key=" + this.key)
      .subscribe(VideoList =>{
        this.allVideo = VideoList;
      })
  }


  async playVid(VideoId: string){

    this.oneVideoId = VideoId;
    const info:any = await yt.info(VideoId);
    this.streamURL(info.formats[0].url);
 
  }
  
  selectActionVd(event){
    var value = event.target.value;
    this.oneVideoId = value;
    this.showQuestions(this.allVideoId, this.oneVideoId);
  }
  streamURL(url: any) {

   const options: StreamingVideoOptions = {
     successCallback: () =>{
     },
     errorCallback: (e)=>{
       console.log('err')
     },
     orientation:'landscape',
     shouldAutoClose:true,
     controls:true
   };
   this.streamingMedia.playVideo(url,options)
  }

   showQuestions(allIdVideo,oneIdVideo) {

    var itemSplit = allIdVideo.split(",");
    var indexOneVd =  itemSplit.findIndex( item => {return item === oneIdVideo });
    
    this.http.get(this.urlBE + '?act=getidlesson&idvideo='+allIdVideo)
    .subscribe( VideoList =>{
      var idLesson =  VideoList['data']['id'];
      
       this.http.get(this.urlBE + '?act=getquestion&idlesson='+idLesson+ '&vitri='+indexOneVd)
                .subscribe(data =>{
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                      special: JSON.stringify(data)
                    }
                  };
                  this.route.navigate(['/excercise'],navigationExtras);
                })
    })
    
  }
;
}
