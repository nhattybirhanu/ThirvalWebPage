import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient:HttpClient) { }

  getChallengePack($id:string):Observable<ChallengePack>{
    return this.httpClient.get<ChallengePack>(`${environment.BASE_URL}/challenges/title`,{
      params:{
        title:$id
      }
    })  }
  getChallenge($id:string):Observable<ChallengePack>{
    return this.httpClient.get<ChallengePack>(`${environment.BASE_URL}/challenges/title`,{
      params:{
        title:$id
      }
    })
  }
  getChallengeTitles():Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.BASE_URL}/challenges/titles`)
  }

  async getIds() {
    return new Promise<string[]>(resolve => {
      this.getChallengeTitles().subscribe(value => {
        resolve(value)

      })
    })
  }
}
export interface ChallengePack {
  id: string;
  userId: string;
  title: string;
  subTitle: string;
  description: string;
  category: CategoryChallenge;
  // challengeType: ChallengeType;
  daysToComplete: number;
  challengeMembers: any[];
  challenges: Challenge[];
  totalPoint: number;
  media: Media;
  additionalData: Record<string, string>;
  currentDateStatus: string; // Use ISO 8601 format for dates
  startDateTime: string; // Use ISO 8601 format for dates
  endDateTime: string; // Use ISO 8601 format for dates
  tags:string[]
  ownerId?:string
  challengesIds:string[]
}
export interface Challenge {
  $id: string;
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  level: string;
  durationInMinutes: number;
  repetitionInOneDayCount: number;
  isTimeOfDayOptional: boolean;
  timeOfDays: string[];
  totalPoint: number;
  keywords: string[];
  media: Media;
  repetitionDays: string[];
  additionalData: Record<string, string>;
  actionRepetitionInDayTimeOptional: boolean;


}
export interface CategoryChallenge {
  $id: string;
  level: string;
  name: string;
}export interface Media {
  $id: string;
  animationUrl: string;
  imageUrl: string;
  videoUrl: string;
}
