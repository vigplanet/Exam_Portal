
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetSurveyQuestionListRequest } from 'src/app/model/getquetions.request';
import { SubmitSurvey } from 'src/app/model/request/sumitsurvey';
import { GetSurveyQuestion, GetSurveyQuestionList } from 'src/app/model/response/getserveyquetionslist';
import { GetSurveyDetail, SurveyDetail } from 'src/app/model/response/getsurveydetail';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public SurveyQuestionList: Array<GetSurveyQuestion> = [];
  public totalNumberOfQuetions: Array<number> = [];
  public currentActiveQuetion: any = {};
  public surveyDetail: Array<SurveyDetail> = [];
  public answeredQuetionsCount: number = 0;
  public notAnsweredQuetionsCount: number = 0;
  public MSRNo: number = 0;
  public SurveyID: number = 0;
  public isMobileResolution: boolean = false;
  public changeLanguage:boolean=false;
  QuetionAnswerModel: any = {};
  constructor(public _apiService: ApiService, private route: ActivatedRoute, public notificationService: NotificationService) {

  }
  ngOnInit(): void {
    console.log('ccccc');
    this.SurveyID = this.route.snapshot.queryParams.surveyid || 0;
    if (this.SurveyID > 0) {
      this.setStudentSurveyStart();
    } else {
      alert("Not Valid Exam ID");
    }
  }
  ngAfterViewInit(): void {
    history.pushState(null, "", window.location.href);
    history.back();
    window.onpopstate = () => history.forward();
  }

  private setStudentSurveyStart(): any {

    let request = {
      "action": "start",
      "surveyid": this.SurveyID
    } as any;
    this._apiService.setStudentSurveyStart(request).subscribe((data: any) => {
      console.log('data', data);
      if (data && data.results == "Exam Already Submited") {
        (<any>$('#AlreadyDone')).hide();
        // (<any>$('#AlreadyDone')).modal('show');

      }
      //this.notificationService.success('ddddd','dddddd');
      //Get Survey Detail
      this.getStudentSurveyDetails();
      //Get Survey Quetions List
      this.getSurveyQuestionList();
    }, (error) => {
      // Execute After Error
    }, () => {
      // Execute Final COde
    })
  }
  private getSurveyQuestionList(): any {
    let request = {
      "action": "start",
      "surveyid": this.SurveyID,
      "msrno": this.MSRNo
    } as GetSurveyQuestionListRequest;
    if (sessionStorage.getItem('getSurveyQuestionList')) {
      this.SurveyQuestionList = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "").results.survey_list;
      this.totalNumberOfQuetions = this.numQuetions(this.SurveyQuestionList.length);
      this.getAnsweredandNonAnswerdQuetionsCount();
      this.currentActiveQuetion = this.SurveyQuestionList[0];

    } else {
      this._apiService.getSurveyQuestionList(request).subscribe((data: GetSurveyQuestionList) => {
        sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
        this.SurveyQuestionList = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "").results.survey_list;
        this.totalNumberOfQuetions = this.numQuetions(this.SurveyQuestionList.length);
        this.getAnsweredandNonAnswerdQuetionsCount();
        this.currentActiveQuetion = this.SurveyQuestionList[0];
      }, (error) => {
        // Execute After Error
      }, () => {
        // Execute Final COde
      })
    }
  }
  // Get Exam Details
  private getStudentSurveyDetails(): any {
    let request = {
      "action": "viewid",
      "msrno": this.MSRNo,
      "surveyid": this.SurveyID
    } as any;
    this._apiService.getStudentSurveyDetails(request).subscribe((data: any) => {
      this.surveyDetail = data.results.survey_exam_model_list;
    }, (error) => {
      // Execute After Error
    }, () => {
      // Execute Final COde
    })
  }


  //function to return list of numbers from 0 to Number of Quetions
  numQuetions(n: number): Array<number> {
    return Array(n);
  }
  timerCompleted($event: any) {
    this.notificationService.error('Time Out', 'Your Exam Timeout');
    this.submitSurvey();

  }
  selectedQuetions(question: any): any {
    console.log(question);
    this.currentActiveQuetion = question;
  }
  getAnsweredandNonAnswerdQuetionsCount(): void {

    this.notAnsweredQuetionsCount = 0;
    this.answeredQuetionsCount = 0;
    this.SurveyQuestionList.forEach((val) => {
      if ((val.anstype == 0 && val.updateansid != 0) || (val.anstype == 1 && val.updateansid != 0)) {
        // increment matched property by 1
        this.answeredQuetionsCount++;
      }
      else {
        // increment matched property by 1
        this.notAnsweredQuetionsCount++;
      }
    });
  }

  submitSurvey(): void {
    // (<any>$('#SubmitExam')).modal('show');
    let request = {
      action: "",
      msrno: this.MSRNo,
      surveyid: this.SurveyID
    } as SubmitSurvey;
    this._apiService.setStudentSurveySubmit(request).subscribe((data: any) => {
      this.notificationService.success('Success', 'Your Exam Submitted Successfully');
      this.surveyDetail = data.results.survey_exam_model_list;
      window.location.href="http://localhost:4200/results?surveyid="+this.SurveyID;
      //After Submit Url 
    }, (error) => {
      this.notificationService.error('Error', 'Error in Submit Exam');
      // Execute After Error
    }, () => {
      // Execute Final COde
    })
  }
  clearSelectedOption(question: any): void {
    console.log('question', question);
    console.log('this.QuetionAnswerModel', this.QuetionAnswerModel);
    const req = {
      action: "",
      msrno: this.MSRNo,
      surveyid: this.SurveyID,
      questionid: question.questionid
    };
    if (question.updateansid > 0) {
      this._apiService.setQuesAnsDelete(req).subscribe((data: any) => {
        this.notificationService.success('Success', 'Your Previous Answer Clear');
        const index = this.SurveyQuestionList.findIndex(quetion => quetion === question);
        if (this.SurveyQuestionList[index]) {
          this.SurveyQuestionList[index].updateansid = 0;
          this.SurveyQuestionList[index].anstype = 2;
          let data = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "");
          if (data && data.results && data.results.survey_list) {
            data.results.survey_list = [];
            data.results.survey_list = this.SurveyQuestionList;
            sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
          }

        }
        this.getAnsweredandNonAnswerdQuetionsCount();
        delete this.QuetionAnswerModel[question.questionid];
      }, (error) => {
        this.notificationService.error('Error', 'Error in Clear Previous Answer');
        // Execute After Error
      }, () => {
        // Execute Final COde
      })

    }else{
      delete this.QuetionAnswerModel[question.questionid];
    }
  }
  saveAndNext(question: any): void {
    let request = {
      "msrno": this.MSRNo,
      "surveyid": this.SurveyID,
      "questionid": question.questionid,
      "ansid": this.QuetionAnswerModel[question.questionid],
      "ishindi": 0,
      "anstype": 0
    };
    if (this.QuetionAnswerModel[question.questionid]) {
      this._apiService.setQuesAnsSave(request).subscribe((data: any) => {
        this.notificationService.success('Success', 'Your Answer Submitted Successfully');
        const index = this.SurveyQuestionList.findIndex(quetion => quetion === question);
        if (this.SurveyQuestionList[index]) {
          this.SurveyQuestionList[index].updateansid = this.QuetionAnswerModel[question.questionid] || 0;
          this.SurveyQuestionList[index].anstype = 0;
          let data = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "");
          if (data && data.results && data.results.survey_list) {
            data.results.survey_list = [];
            data.results.survey_list = this.SurveyQuestionList;
            sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
          }

        }
        this.getAnsweredandNonAnswerdQuetionsCount();
        this.currentActiveQuetion = this.SurveyQuestionList[index + 1];
      }, (error) => {
        // Execute After Error
        this.notificationService.error('Error', 'Error in Save your Answer');
      }, () => {
        // Execute Final COde
      });
    } else {
      const index = this.SurveyQuestionList.findIndex(quetion => quetion === question);
      if (this.SurveyQuestionList[index]) {
        this.SurveyQuestionList[index].updateansid = 0;
        this.SurveyQuestionList[index].anstype = 2;
        let data = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "");
        if (data && data.results && data.results.survey_list) {
          data.results.survey_list = [];
          data.results.survey_list = this.SurveyQuestionList;
          sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
        }

      }
      this.getAnsweredandNonAnswerdQuetionsCount();
      this.currentActiveQuetion = this.SurveyQuestionList[index + 1];
    }
  }

  markAndReview(question: any): void {
    let request = {
      "msrno": this.MSRNo,
      "surveyid": this.SurveyID,
      "questionid": question.questionid,
      "ansid": this.QuetionAnswerModel[question.questionid],
      "ishindi": 0,
      "anstype": 1
    };
    if (this.QuetionAnswerModel[question.questionid]) {
      this._apiService.setQuesAnsSave(request).subscribe((data: any) => {
        this.notificationService.success('Success', 'Your Answer Submitted Successfully');
        const index = this.SurveyQuestionList.findIndex(quetion => quetion === question);
        if (this.SurveyQuestionList[index]) {
          this.SurveyQuestionList[index].updateansid = this.QuetionAnswerModel[question.questionid] || 0;
          this.SurveyQuestionList[index].anstype = 1;
          let data = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "");
          if (data && data.results && data.results.survey_list) {
            data.results.survey_list = [];
            data.results.survey_list = this.SurveyQuestionList;
            sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
          }
        }
        this.getAnsweredandNonAnswerdQuetionsCount();
        this.currentActiveQuetion = this.SurveyQuestionList[index + 1];
      }, (error) => {
        // Execute After Error
        this.notificationService.error('Error', 'Error in Save your Answer');
      }, () => {
        // Execute Final COde
      })
    } else {
      const index = this.SurveyQuestionList.findIndex(quetion => quetion === question);
      if (this.SurveyQuestionList[index]) {
        this.SurveyQuestionList[index].updateansid = 0;
        this.SurveyQuestionList[index].anstype = 3;
        let data = JSON.parse(sessionStorage.getItem('getSurveyQuestionList') || "");
        if (data && data.results && data.results.survey_list) {
          data.results.survey_list = [];
          data.results.survey_list = this.SurveyQuestionList;
          sessionStorage.setItem('getSurveyQuestionList', JSON.stringify(data));
        }

      }
      this.getAnsweredandNonAnswerdQuetionsCount();
      this.currentActiveQuetion = this.SurveyQuestionList[index + 1];
    }
  }
  submitExamform(): void {
    (<any>$('#SubmitExam')).modal('show')
      .one('click', '#submitExam', (e: any) => {
        console.log('sdfsdfsd');
        (<any>$('#SubmitExam')).modal('hide');
        this.submitSurvey();
      });
    $("#cancelSubmitExam").one('click', (e: any) => {
      e.preventDefault();
      (<any>$('#SubmitExam')).modal('hide');
    });
  }
  changeLanguageEvent():void{
    this.changeLanguage=!this.changeLanguage;
  }
}
