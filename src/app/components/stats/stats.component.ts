import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-stats',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  standalone:true
})
export class StatsComponent {
  metrics: Metric[] = [
    { label: 'Challenges',    value: 1280,    icon: '🏆' },
    { label: 'Active Users',  value: '24K+',  icon: '👥' },
    { label: 'Downloads',     value: '50K+',  icon: '⬇️' },
    { label: 'Badges Earned', value: '12K+',  icon: '🎖️' }
  ];
}
interface Metric {
  label: string;
  value: number | string;
  icon: string;
}