import { Component } from '@angular/core';
import {buildCssProperty} from '../../color.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: 'footer.component.html',
  styleUrls:['footer.component.css']
})
export class FooterComponent {
  protected readonly buildCssProperty = buildCssProperty;
}
