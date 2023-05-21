import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public MSRNo: number = 0;
  public SurveyID: number = 0;
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log('ccccc');
    this.SurveyID = this.route.snapshot.queryParams.surveyid || 0;
    if (this.MSRNo > 0 && this.SurveyID > 0) {
    } else {
      alert("Not Valid Exam ID");
    }
  }
  agreeWithTermAndCondition():void{

    this.router.navigate(['/home'], { queryParams: { msrno: this.MSRNo ,surveyid:this.SurveyID} });
  }
}
