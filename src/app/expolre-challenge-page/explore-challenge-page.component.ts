import {Component, Input, OnInit} from '@angular/core';
import {HeroComponent} from '../components/hero/hero.component';
import {CategoryChallenge, ChallengeCategory, ChallengeCategoryPackList, ChallengeService} from '../challenge.service';
import {NgForOf, NgIf} from '@angular/common';
import {FooterComponent} from '../components/footer/footer.component';
import {buildCssProperty, buildStyle, ColorSchema, ColorService} from '../color.service';
import {inspect} from 'util';
import {LottieLoaderComponent} from '../lottie-loader/lottie-loader.component';
import {Router, RouterLink} from '@angular/router';
import {ChallengePackItemComponent} from '../component/challenge-pack-item/challenge-pack-item.component';

@Component({
  selector: 'app-explore-challenge-page',
  imports: [
    HeroComponent,
    NgForOf,
    NgIf,
    FooterComponent,
    LottieLoaderComponent,
    RouterLink,
    ChallengePackItemComponent
  ],
  templateUrl: './explore-challenge-page.component.html',
  styleUrl: './explore-challenge-page.component.scss',
  standalone:true
})
export class ExploreChallengePageComponent implements OnInit{

  @Input() pageTitle: string = 'Explore Challenges';
  @Input() pageDescription: string = 'Discover themed challenges for your journey.';
  @Input() pageImage?: string;
  categoriesChallenges:ChallengeCategory[] =[]
    trendingChallengePackList:ChallengeCategoryPackList[]=[]
  categories:ChallengeCategory []=[]
  selectedCategory:ChallengeCategory | undefined
  defaultCardSchema:ColorSchema={
    background:"#1F2937",
    primaryText:"#d4d4d4",
    secondaryText:"#D4D4D4FF"
  }
  cardColorMap:Map<string,ColorSchema>= new Map<string, ColorSchema>()

  constructor(private challengeService:ChallengeService, private colorService:ColorService, private router:Router) {
  }

  ngOnInit(): void {
    this.challengeService.getCategories().subscribe(value => {
      console.log("ChallengeCategory ",value)
      this.categoriesChallenges=value;
    })
    this.challengeService.getTrending().subscribe(value => {
      this.trendingChallengePackList=value.challengeCategoryPackLists;
      this.categories = this.trendingChallengePackList.map(value1 => value1.category)
    })
  }
async  loadColorSchema(){
    if (this.colorService.isBrowser){
      for (const challengeCategorises of this.categoriesChallenges) {
        if (challengeCategorises.media&&challengeCategorises.media.imageUrl){
          const  cardSchema= await this.colorService.extractColorSchemeFromImageUrl(challengeCategorises.media.imageUrl, this.defaultCardSchema);
          console.log(challengeCategorises.name,cardSchema,cardSchema.background===this.defaultCardSchema.background)
          this.cardColorMap.set(challengeCategorises.id,cardSchema)

        }
      }
    }
  }

  openCategoriesDetail(slug:string){
    this.router.navigate(['explore',slug]).then(value => {
      console.log("open explorer ",value)
    },reason => {
      console.log("open explorer ex",reason)

    })
  }

  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;

  selectCategory(selected?: ChallengeCategory) {
  this.selectedCategory=selected;
  }
  get filtered() {
    return (!this.selectedCategory)
      ? this.trendingChallengePackList.flatMap(value => value.challengePacks)
      : this.trendingChallengePackList.find(c => c.category.id === this.selectedCategory!.id)?.challengePacks || [];
  }
}
