import {Component, OnInit} from '@angular/core';
import {
  ChallengeCategory,
  ChallengeCategoryPackList,
  ChallengePack,
  ChallengeService,
  Media
} from '../challenge.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FooterComponent} from '../components/footer/footer.component';
import {HeroComponent} from '../components/hero/hero.component';
import {LottieLoaderComponent} from '../lottie-loader/lottie-loader.component';
import {buildCssProperty, buildStyle} from '../color.service';
import {slugify} from '../util';
import {buildUrl, MetadataResolver} from '../MetadataResolver';
import {ChallengePackItemComponent} from '../component/challenge-pack-item/challenge-pack-item.component';

@Component({
  selector: 'app-category-challenge-detail',
  imports: [
    NgIf,
    FooterComponent,
    HeroComponent,
    LottieLoaderComponent,
    NgForOf,
    RouterLink,
    ChallengePackItemComponent
  ],
  templateUrl: './category-challenge-detail.component.html',
  styleUrls: ['./category-challenge-detail.component.scss'],
  standalone:true,
})
export class CategoryChallengeDetailComponent implements OnInit{
  categoryChallengePacks:ChallengeCategoryPackList | undefined;
  packs: ChallengePack[] = [];
  category!: ChallengeCategory | undefined;

  // pagination
  page = 1;
  pageSize = 6;
  totalPages = 1;
  constructor(private challengeService:ChallengeService, private activeRoute:ActivatedRoute, private router:Router,
              private metaResolver:MetadataResolver
              ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(value => {
      let slug= value['id'];
      if (slug){
      this.challengeService.getCategoryChallengePack(slug).subscribe(challengeCategory => {
        this.categoryChallengePacks=challengeCategory;
        if (this.categoryChallengePacks){
          this.category=this.categoryChallengePacks.category
          this.packs = this.categoryChallengePacks.challengePacks
          this.totalPages = Math.ceil(this.packs.length / this.pageSize);

        }
        this.metaResolver.applyMetaData({
          title:challengeCategory.category.name,
          description:challengeCategory.category.description,
          image:challengeCategory.category.media.imageUrl || '',
          url:buildUrl('explore',challengeCategory.category.name)
        })
      })
      }
    })
  }
  openChallenges(slug:string){
    this.router.navigate(['challenges',slug]).then(value => {
    },reason => {

    })
  }
  get pagedPacks() {
    const start = (this.page - 1) * this.pageSize;
    return this.packs.slice(start, start + this.pageSize);
  }

  goTo(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
  protected readonly slugify = slugify;
}
