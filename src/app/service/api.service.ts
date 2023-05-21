import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { GetSurveyQuestionListRequest } from '../model/getquetions.request';
import { SubmitSurvey } from '../model/request/sumitsurvey';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private cookieService:CookieService) {
    this.getheaders();
  }

  getheaders(): any {
    let httpOptions: any;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        "Authorization": "Bearer " + this.cookieService.get('X-Auth')
      })
    };
    return httpOptions;
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  // Set StudentSurveyStart
  setStudentSurveyStart(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}api/exam/setStudentSurveyStart`, request, this.getheaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get All Quetions List
  getSurveyQuestionList(request: GetSurveyQuestionListRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}api/exam/getSurveyQuestionList`, request, this.getheaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get Survey Detail
  getStudentSurveyDetails(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}api/exam/getStudentSurveyDetails`, request, this.getheaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Update Answer
  setQuesAnsSave(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}api/exam/setQuesAnsSave`, request, this.getheaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  // Submit Survey
  setStudentSurveySubmit(request: SubmitSurvey): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}api/exam/setStudentSurveySubmit`, request, this.getheaders())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
    // Clear Previous Answer
    setQuesAnsDelete(request: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}api/exam/setQuesAnsDelete`, request, this.getheaders())
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }
  
}
