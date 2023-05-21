
export interface SurveyDetail{
    cnt: number;
    surveyName: string;
    description: string;
    filepath?: any;
    duration: number;
}

export class GetSurveyDetail {
    status: string="";
    status_msg: string="";
    Data : Array<SurveyDetail>=[];
}