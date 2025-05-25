import {Component, OnInit} from '@angular/core';
import {ChallengeCategory, ChallengeService} from '../../challenge.service';
import {LottieLoaderComponent} from '../../lottie-loader/lottie-loader.component';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-categories-page',
  imports: [
    LottieLoaderComponent,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
  standalone:true
})
export class CategoriesPageComponent implements OnInit{
  categoriesChallenges:ChallengeCategory[] =[]

  constructor(private challengeService:ChallengeService) {
  }

  ngOnInit(): void {
    this.challengeService.getCategories().subscribe(value => {
      this.categoriesChallenges=value;
    })
  }

}
