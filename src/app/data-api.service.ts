import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private idClass;
  private idSubject;
  // private dataStorage = [];
  private _todos = new BehaviorSubject<any>([]);
  // private dataStore: { todos:any } = { todos: [] };

  url:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=';
  key = environment.keyYoutube;
  urlBE= 'http://khoahocnhan.herokuapp.com/';
  constructor(  private http: HttpClient) { }
  
  getDataText(){
    return this.http.get(this.url+"p3qvj9hO_Bo,rSqOhVonfiY,iOuZNB2G1mc,4loxu7ttlNo,fjsFA0mGIBQ"+"&key="+this.key);
  }
  getClasslist(){
    return this.http.get(`${this.urlBE}?act=listclasses`);
  }
  getListSubject(){
    return this.http.get(`${this.urlBE}?act=listsubjects`);
  }

  getCourses(){
    this.http.get(`${this.urlBE}?act=listcourses&class=${this.idClass}&subject=${this.idSubject}`)
    .subscribe(data=>{
      this._todos.next(data);
    })
  }

  setValueIdClass(idClass){
    this.idClass = idClass;
    localStorage.setItem('idclass',idClass);
  }
 
  setValueIdSubject(idSubject){
    this.idSubject = idSubject;
    localStorage.setItem('idsubject',idSubject);
    this.getCourses();
  }
  getToDo(){
    return this._todos;
  }

}
