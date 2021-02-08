import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.page.html',
  styleUrls: ['./excercise.page.scss'],
})
export class ExcercisePage implements OnInit {
  

  ngOnInit() {
    
  }

  shuffedQuestions;
  currentQuestionIndex;
  hide=true;
  btnstart = false;
  data: any;
  question;
  answer1;
  answer2;
  answer3;
  answer4;
  persent;
  progess = 0;
  win = 0;
  allQuestion = 0;
  persentWin = 0;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        // this.startGame();
      }
    });
  }
  
  startGame(){
    this.hide = false;
    this.btnstart = true;
    this.shuffedQuestions = this.data['data'];  
    this.persent = 100 / this.shuffedQuestions.length;
    this.allQuestion = this.shuffedQuestions.length;
    this.currentQuestionIndex =0;
    this.nextQuestion();
  }

  nextQuestion(){ 
   
    this.showQuestion(this.shuffedQuestions[this.currentQuestionIndex]);
    this.resetState();
   
  }
  showQuestion(question){
    this.question =question.question;
    this.answer1 = question.answer1;
    this.answer2 = question.answer2;
    this.answer3 = question.answer3;
    this.answer4 = question.answer4;
    // alert(question.question);  
  }
  selectAnswer(index){
    
      var kq = this.shuffedQuestions[this.currentQuestionIndex].answer;
    
      document.getElementById("next").classList.remove('hide');
  
      if(index == kq)
      {
        document.querySelectorAll('.btn')[index-1].classList.add('success');
        this.progess +=  (this.persent/100);
        this.win ++;
  
      }else
      {
        document.querySelectorAll('.btn')[index-1].classList.add('danger');
        this.progess +=  (this.persent/100);
      }
      if(this.shuffedQuestions.length > this.currentQuestionIndex+1)
      {
        document.getElementById("next").classList.remove('hide');
      }else
      {

        this.persentWin = this.win/this.allQuestion*100 ;

        setTimeout(()=>{
          document.getElementById('boxkq').classList.remove('hide');
        },2000)
      }
      this.currentQuestionIndex ++;
  
  }
  resetState(){

    document.getElementById("next").classList.add('hide');
    var answerBtn = document.querySelectorAll('.btn');

    for (let i = 0; i < answerBtn.length; i++) {
      answerBtn[i].classList.remove('danger');
      answerBtn[i].classList.remove('success');
    }
  }
  goHome(){
    this.router.navigate(['']);
  }
}
