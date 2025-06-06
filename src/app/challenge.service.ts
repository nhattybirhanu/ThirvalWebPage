import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient:HttpClient) { }


  getChallenge($id:string):Observable<ChallengePack>{
    return this.httpClient.get<ChallengePack>(`${environment.BASE_URL}/challenges/slug`,{
      params:{
        slug:$id
      }
    })
  }
  getCategoryChallengePack(slug:string):Observable<ChallengeCategoryPackList>{
    return this.httpClient.get<ChallengeCategoryPackList>(`${environment.BASE_URL}/challengesPack/categories/${slug}`)
  }
  getChallengeTitles():Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.BASE_URL}/challenges/slugs`)
  }
  getTrending():Observable<Trending> {
    return this.httpClient.get<Trending>(`${environment.BASE_URL}/trending`)

  }

  async getIds() {
    return await lastValueFrom(this.getChallengeTitles());
  }

   getCategories(){
    return this.httpClient.get<ChallengeCategory[]>(`${environment.BASE_URL}/categories`)
  }
  getChallengePack($id:string):Observable<ChallengePack>{
    return this.httpClient.get<ChallengePack>(`${environment.BASE_URL}/challenges/slug`,{
      params:{
        slug:$id
      }
    })  }
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
  id: string;
  level: string;
  name: string;
}export interface Media {
  $id: string;
  animationUrl: string;
  imageUrl: string | undefined;
  videoUrl: string;
}
export interface LevelCount {
  level:string,
  count:string
}
export interface ChallengeCategory{
  id:string;
  name:string;
  description:string;
  levelCounts:LevelCount[];
  media:Media;
  count:number,
  slug:string
}
export interface ChallengeCategoryPackList{
  category:ChallengeCategory,
  challengePacks:ChallengePack[]
}
export interface Trending{
  challengeCategoryPackLists:ChallengeCategoryPackList[]
}
