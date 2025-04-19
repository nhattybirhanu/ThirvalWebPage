import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengePack, ChallengeService} from '../challenge.service';
import {HeroComponent} from '../components/hero/hero.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FooterComponent} from '../components/footer/footer.component';
import {sign} from 'crypto';
import {async} from 'rxjs';
import {LottieLoaderComponent} from '../lottie-loader/lottie-loader.component';
import {ChallengeItemComponent} from '../challenge-item/challenge-item.component';
import {buildCssProperty, buildStyle, ColorSchema, ColorService} from '../color.service';
import {changesToK, randomIntFromInterval} from '../util';

@Component({
    selector: 'app-challenge-pack',
  imports: [
    HeroComponent,
    NgIf,
    FooterComponent,
    LottieLoaderComponent,
    ChallengeItemComponent,
    NgForOf,
    NgClass
  ],
    standalone:true,
    templateUrl: './challenge-pack.component.html',
    styleUrls: ['./challenge-pack.component.css'],
})
export class ChallengePackComponent implements OnInit{
  challengePack:ChallengePack | undefined
  numberOfMembers = changesToK(randomIntFromInterval(2000,10000));
  detailCardColorSchema:ColorSchema ={
    accent:'#4F46E5',
    background:'#000000',
    primaryText:'#ffffff',
    secondaryText:'#ABABABFF'
  }

  constructor(private activatedRoute:ActivatedRoute,private challengeService:ChallengeService, private colorService:ColorService) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      let id = value['id']
      if (id){
        this.challengeService.getChallengePack(id).subscribe(challengePack => {
            this.challengePack=challengePack

        }
        )
      }
    })
  }

  protected readonly async = async;
  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
  protected readonly changesToK = changesToK;
  protected readonly randomIntFromInterval = randomIntFromInterval;

  sharechallengePack() {

  }
}
