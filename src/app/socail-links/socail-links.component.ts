import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-socail-links',
  imports: [
    NgForOf
  ],
  templateUrl: './socail-links.component.html',
  styleUrl: './socail-links.component.scss',
  standalone:true
})
export class SocailLinksComponent {
  @Input() socials: Social[] = [
    { name: 'Twitter',  icon: 'bi-twitter-x',   url: 'https://twitter.com/yourhandle'   },
    { name: 'Facebook', icon: 'bi-facebook',  url: 'https://facebook.com/yourpage'   },
    { name: 'Instagram',icon: 'bi-instagram', url: 'https://instagram.com/yourhandle' },
    { name: 'LinkedIn', icon: 'bi-linkedin',  url: 'https://linkedin.com/company/yourco' },
    { name: 'YouTube',  icon: 'bi-youtube',   url: 'https://youtube.com/yourchannel'  },
  ];
}
interface Social {
  name: string;
  icon: string;  // e.g. 'bi-twitter'
  url: string;
}
