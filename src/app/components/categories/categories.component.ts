import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {ChallengeCategory, ChallengeService} from '../../challenge.service';
import {slugify} from '../../util';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html'
})
export class ChallengeCategoriesComponent implements OnInit{

  constructor(private challengeService:ChallengeService) {
  }


  categories: Category[] = [
    { id: 'health',      name: 'Health',      image: '💪' },
    { id: 'adventure',   name: 'Adventure',   image: '🏔️' },
    { id: 'innovation',  name: 'Innovation',  image: '💡' },
    { id: 'mindfulness', name: 'Mindfulness', image: '🧘' },
    { id: 'fitness',     name: 'Fitness',     image: '🏃' },
    { id: 'creativity',  name: 'Creativity',  image: '🎨' },
    { id: 'productivity',name: 'Productivity',image: '📈' },
    { id: 'social',      name: 'Social',      image: '🤝' },
  ];

  ngOnInit(): void {
    this.challengeService.getCategories().subscribe((categories:ChallengeCategory[])=>{
      this.categories = categories.map(value => {
        return {
          id: value.id,
          name: value.name,
          image: value.media.imageUrl!
        }
      });
    })
  }

  protected readonly slugify = slugify;
}
interface Category {
  id: string;
  name: string;
  image: string; // could also be an image URL
}
