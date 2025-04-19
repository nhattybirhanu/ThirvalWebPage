import {Component, Input} from '@angular/core';
import {ChallengePack} from '../../challenge.service';
import {LottieLoaderComponent} from '../../lottie-loader/lottie-loader.component';
import {RouterLink} from '@angular/router';
import {changesToK, randomIntFromInterval, slugify} from '../../util';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-challenge-pack-item',
  imports: [
    LottieLoaderComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './challenge-pack-item.component.html',
  styleUrls: ['./challenge-pack-item.component.scss'],
  standalone:true,
})
export class ChallengePackItemComponent {
  @Input() challengePack:ChallengePack | undefined

  protected readonly slugify = slugify;
  no_member: string=changesToK(randomIntFromInterval(2000,5000));

  sharechallengePack(challengePack: ChallengePack) {

  }
}
