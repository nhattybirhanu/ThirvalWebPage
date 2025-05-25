import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-feature-page',
  imports: [
    NgForOf
  ],
  templateUrl: './feature-page.component.html',
  styleUrl: './feature-page.component.scss',
  standalone:true
})
export class FeaturePageComponent {
  features = [
    {
      icon: 'bi-person-lines-fill',
      title: 'Personalized Challenges',
      desc: 'Take on curated personal development challenges across fitness, mindset, productivity, and lifestyle — all tailored to your goals.'
    },
    {
      icon: 'bi-compass-fill',
      title: 'Guided Progression',
      desc: 'Advance through levels as you complete challenges and unlock new paths. Visualize your journey from Explorer to Trailblazer.'
    },
    {
      icon: 'bi-calendar-check-fill',
      title: 'Smart Scheduling',
      desc: 'Plan and track your challenges with a built-in scheduler and reminders. Never lose momentum again.'
    },
    {
      icon: 'bi-trophy-fill',
      title: 'Milestone Rewards',
      desc: 'Earn badges, trophies, and bragging rights as you reach key milestones. Motivation meets achievement.'
    },
    {
      icon: 'bi-people-fill',
      title: 'Community & Battles',
      desc: 'Join public challenges or invite a friend to a head-to-head duel. Push each other to new heights.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Progress Insights',
      desc: 'Track completed challenges, consistency streaks, XP earned, and personal growth stats — all in a beautifully visual dashboard.'
    },
    {
      icon: 'bi-phone-fill',
      title: 'Seamless Experience',
      desc: 'Smooth animations, offline tracking, dark/light modes, and a minimalist interface focused on your growth.'
    },
    {
      icon: 'bi-shield-lock-fill',
      title: 'Secure & Private',
      desc: 'Your data is safe. Challenges are private by default, with optional sharing for social accountability.'
    },
    {
      icon: 'bi-palette-fill',
      title: 'Customizable Themes',
      desc: 'Switch between preset color palettes or create your own to make Thrival truly yours.'
    }
  ];
}
