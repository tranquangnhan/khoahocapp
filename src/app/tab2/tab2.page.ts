import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public classLists = {};
  constructor(private dataVid: DataApiService,public router: Router) {}
  getDataClass(){
    this.dataVid.getClasslist().subscribe(data=>{
      this.classLists = data;
    })
  }
  chooseClass(id){
    this.dataVid.setValueIdClass(id);
    this.router.navigate(['/tabs/tab4']);
  }
  ngOnInit(){
    this.getDataClass()
  }
}
