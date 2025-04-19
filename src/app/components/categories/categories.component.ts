import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html'
})
export class ChallengeCategoriesComponent {
  categories: Category[] = [
    { id: 'health',      name: 'Health',      icon: '💪' },
    { id: 'adventure',   name: 'Adventure',   icon: '🏔️' },
    { id: 'innovation',  name: 'Innovation',  icon: '💡' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧘' },
    { id: 'fitness',     name: 'Fitness',     icon: '🏃' },
    { id: 'creativity',  name: 'Creativity',  icon: '🎨' },
    { id: 'productivity',name: 'Productivity',icon: '📈' },
    { id: 'social',      name: 'Social',      icon: '🤝' },
  ];

}
interface Category {
  id: string;
  name: string;
  icon: string; // could also be an image URL
}
