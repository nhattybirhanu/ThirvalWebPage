import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [HeroComponent, FooterComponent],
    template: `
    <app-hero 
      title="Unlock Your Potential. Conquer Challenges."
      subtitle="Join a global community where competition meets growth. Track progress, challenge friends, and earn rewards."
      [showCta]="true"
    ></app-hero>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">Why Thrival?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Competitive Challenges</h3>
            <p>Engage in personal, community, or one-on-one challenges.</p>
          </div>
          <div class="feature-card">
            <h3>Leaderboard & Achievements</h3>
            <p>Track your progress, earn badges, and rise in the rankings.</p>
          </div>
          <div class="feature-card">
            <h3>Smart Challenge Matching</h3>
            <p>AI-powered recommendations tailored to your level.</p>
          </div>
          <div class="feature-card">
            <h3>Exclusive Rewards</h3>
            <p>Win digital and real-world rewards for accomplishments.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="#start" class="btn btn-primary">Start Your First Challenge!</a>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">How It Works</h2>
        <div class="step-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Pick a Challenge</h3>
            <p>Explore categories or get AI recommendations</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>Join or Create</h3>
            <p>Compete alone, with friends, or in a community</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Daily updates, streaks, and leaderboard ranking</p>
          </div>
          <div class="step-card">
            <div class="step-number">4</div>
            <h3>Win & Level Up</h3>
            <p>Earn badges, rewards, and level up</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="#join" class="btn btn-primary">Join Now & Start Winning!</a>
        </div>
      </div>
    </section>

    <!-- Community & Social Proof Section -->
    <section class="testimonials">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Join a Thriving Community</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <p>"Thrival helped me achieve my fitness goals through fun challenges!"</p>
            <div class="user">- Sarah K.</div>
          </div>
          <div class="testimonial-card">
            <p>"The community support is amazing. I've made great friends here!"</p>
            <div class="user">- Mike R.</div>
          </div>
          <div class="testimonial-card">
            <p>"Love how the AI matches me with perfect challenges for my level."</p>
            <div class="user">- Alex T.</div>
          </div>
        </div>
        <div class="stats-grid">
          <div>
            <h3 style="font-size: 2rem; color: #4F46E5;">10K+</h3>
            <p>Challenges Completed</p>
          </div>
          <div>
            <h3 style="font-size: 2rem; color: #4F46E5;">5K+</h3>
            <p>Active Users</p>
          </div>
          <div>
            <h3 style="font-size: 2rem; color: #4F46E5;">500+</h3>
            <p>Leaderboard Champions</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="#challenges" class="btn btn-primary">See Top Challenges!</a>
        </div>
      </div>
    </section>

    <!-- Subscription Plans Section -->
    <section class="pricing">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Upgrade for More!</h2>
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Free</h3>
            <div class="price">$0</div>
            <ul class="features-list">
              <li>Basic Challenges</li>
              <li>Community Access</li>
              <li>Basic Progress Tracking</li>
            </ul>
            <a href="#signup" class="btn btn-primary">Get Started</a>
          </div>
          <div class="pricing-card featured">
            <h3>Premium</h3>
            <div class="price">$9.99/mo</div>
            <ul class="features-list">
              <li>All Free Features</li>
              <li>Exclusive Challenges</li>
              <li>Premium Badges</li>
              <li>Custom Leaderboards</li>
              <li>Advanced Analytics</li>
            </ul>
            <a href="#upgrade" class="btn btn-primary">Upgrade & Dominate!</a>
          </div>
          <div class="pricing-card">
            <h3>Team</h3>
            <div class="price">$29.99/mo</div>
            <ul class="features-list">
              <li>All Premium Features</li>
              <li>Team Challenges</li>
              <li>Group Analytics</li>
              <li>Custom Team Events</li>
            </ul>
            <a href="#team" class="btn btn-primary">Start Team Plan</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq">
      <div class="container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How do challenges work?</h3>
            <p>Choose from various categories, set your goals, and track progress. Compete solo or with others!</p>
          </div>
          <div class="faq-item">
            <h3>How do I track my progress?</h3>
            <p>Use our mobile app to log activities, view stats, and check your position on leaderboards.</p>
          </div>
          <div class="faq-item">
            <h3>How do I earn badges?</h3>
            <p>Complete challenges, maintain streaks, and achieve milestones to unlock unique badges.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="#support" class="btn btn-primary">Need Help? Contact Us!</a>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
    standalone:true,
})
export class HomeComponent {}