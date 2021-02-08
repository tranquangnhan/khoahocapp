import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import * as yt from 'ionic-youtube-streams';
import { StreamingMedia,StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public data = {};

  constructor(
    private dataVid : DataApiService,
    private youtube: YoutubeVideoPlayer,
    private readonly streamingMedia:StreamingMedia,
    public alertController: AlertController
    ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getData(){
    this.dataVid.getDataText().subscribe(data=>{
     this.data = data;
    })

  }

  ngOnInit(){
    this.getData();
  }

  async playVid(VideoId: string){
    const info:any = await yt.info(VideoId);
    this.streamURL(info.formats[0].url);
  }
  
  streamURL(url: any) {
   const options: StreamingVideoOptions = {
     successCallback: () =>{
      this.presentAlert();
     },
     errorCallback: (e)=>{
       console.log('err');
       this.presentAlert();
     },
     orientation:'landscape',
     shouldAutoClose:true,
     controls:true,
   };
   this.streamingMedia.playVideo(url,options)
  };
}
