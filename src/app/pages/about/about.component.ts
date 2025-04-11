import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-about',
    standalone:true,
    imports: [HeroComponent, FooterComponent],
    template: `
    <app-hero title="About Thrival"></app-hero>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Our Mission</h2>
        <div class="content-card">
          <p style="font-size: 1.25rem; margin-bottom: 20px;">
            At <strong>Thrival</strong>, we believe in the power of <strong>challenges</strong> to unlock human potential. 
            Whether you're looking to push personal limits, engage in healthy competition, or be part of a supportive community, 
            we provide the tools and motivation to keep you going.
          </p>
          <p style="font-size: 1.25rem;">
            We're more than an app—we're a movement that encourages growth, learning, and achievement through gamified challenges.
          </p>
        </div>
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="features">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">What We Do</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Gamified Challenges</h3>
            <p>From fitness to mental agility, creativity to teamwork—choose from various challenge categories.</p>
          </div>
          <div class="feature-card">
            <h3>Community & Competition</h3>
            <p>Join forces, compete with friends, or challenge yourself.</p>
          </div>
          <div class="feature-card">
            <h3>Leaderboards & Achievements</h3>
            <p>Track progress, earn badges, and celebrate milestones.</p>
          </div>
          <div class="feature-card">
            <h3>AI-Powered Recommendations</h3>
            <p>Get challenges tailored to your skills and interests.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="vision">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">Our Vision</h2>
        <div class="content-card" style="text-align: center;">
          <p style="font-size: 1.25rem; margin-bottom: 30px;">
            We envision a world where challenges drive personal and collective growth. Through 
            <strong>friendly competition and self-improvement</strong>, we aim to create a space where 
            <strong>everyone thrives</strong>, regardless of their starting point.
          </p>
          <blockquote class="quote">
            "Progress happens one challenge at a time."
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section class="community">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Meet the Community</h2>
        <div class="content-card" style="text-align: center;">
          <p style="font-size: 1.25rem; margin-bottom: 30px;">
            Thrival isn't just an app; it's a <strong>global movement</strong>.
          </p>
          <div class="community-stats">
            <div class="stat-item">
              <span class="stat-number">10K+</span>
              <span class="stat-label">Active Users</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Challenges Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Get Involved Section -->
    <section class="get-involved">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Get Involved</h2>
        <div class="action-grid">
          <div class="action-card">
            <h3>Download & Compete</h3>
            <p>Get started with your first challenge today</p>
            <a href="#download" class="btn btn-primary">Download Now</a>
          </div>
          <div class="action-card">
            <h3>Join Community</h3>
            <p>Connect with like-minded achievers</p>
            <a href="#join" class="btn btn-primary">Join Now</a>
          </div>
          <div class="action-card">
            <h3>Partner With Us</h3>
            <p>Collaborate and make an impact</p>
            <a href="#contact" class="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `
})
export class AboutComponent {}