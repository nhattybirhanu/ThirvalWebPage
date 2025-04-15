import {Component, OnInit} from '@angular/core';
import {ChallengeCategoryPackList, ChallengeService} from '../challenge.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FooterComponent} from '../components/footer/footer.component';
import {HeroComponent} from '../components/hero/hero.component';
import {LottieLoaderComponent} from '../lottie-loader/lottie-loader.component';
import {buildCssProperty, buildStyle} from '../color.service';
import {slugify} from '../util';

@Component({
  selector: 'app-category-challenge-detail',
  imports: [
    NgIf,
    FooterComponent,
    HeroComponent,
    LottieLoaderComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './category-challenge-detail.component.html',
  styleUrl: './category-challenge-detail.component.scss',
  standalone:true,
})
export class CategoryChallengeDetailComponent implements OnInit{
  categoryChallengePacks:ChallengeCategoryPackList | undefined;
  constructor(private challengeService:ChallengeService, private activeRoute:ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(value => {
      let slug= value['slug'];
      if (slug){
      this.challengeService.getCategoryChallengePack(slug).subscribe(challengeCategory => {
        this.categoryChallengePacks=challengeCategory;
        console.log("challengeCategory",challengeCategory)
      })
      }
    })
  }
  openChallenges(slug:string){
    this.router.navigate(['challenges',slug]).then(value => {
    },reason => {

    })
  }


  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
  protected readonly slugify = slugify;
}
