import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  listSubjects = {};
  constructor(private dataVid: DataApiService,public router: Router) {}

  getDataSubjects(){      
    this.dataVid.getListSubject().subscribe(data=>{
      this.listSubjects = data;
    })
  }
  chooseSubject(id){
    this.dataVid.setValueIdSubject(id);
    this.router.navigate(['/tabs/tab3']);
  }
  ngOnInit(){
    this.getDataSubjects();
  }
}
