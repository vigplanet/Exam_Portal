
export interface SurveyQuestionAnswerList {
    ansid: number;
    surveyID: number;
    questionID: number;
    answer: string;
    imgpath: string;
}
export interface GetSurveyQuestion{
    status ?: any;
    rowid: number;
    questionid: number;
    surveyid: number;
    question: string;
    questionType: string;
    realans: string;
    realansid: number;
    imagepath: string;
    imagepath2:string;
    question2: string;
    ishindi: number;
    rno: number;
    survey_question_answer_list: Array<SurveyQuestionAnswerList>;
    updateansid:number;
    anstype:number;
}

export class GetSurveyQuestionList {
    status: string="";
    status_msg: string="";
    Data: Array<GetSurveyQuestion>=[];
}