import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3 style="margin-bottom: 20px;">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="#challenges">Challenges</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 style="margin-bottom: 20px;">Download</h3>
            <ul class="footer-links">
              <li><a href="#ios"><img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png" alt="Download on App Store" style="height: 40px;"></a></li>
              <li><a href="#android"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" style="height: 60px;"></a></li>
            </ul>
          </div>
          <div>
            <h3 style="margin-bottom: 20px;">Connect</h3>
            <ul class="footer-links social-links">
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 style="margin-bottom: 20px;">Legal</h3>
            <ul class="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div style="text-align: center; padding-top: 30px; border-top: 1px solid #374151;">
          <p>© 2025 Thrival. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}