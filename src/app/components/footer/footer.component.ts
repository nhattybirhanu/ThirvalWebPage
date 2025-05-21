import { Component } from '@angular/core';
import {buildCssProperty} from '../../color.service';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

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

  constructor(private httpClient:HttpClient) {
  }

  subscribe(email:string){
    this.httpClient.post(`${environment.BASE_URL}/mailing-list/subscribe`, {"email":email}).subscribe({
      next: (res) => {
      },
      error: (err) => {
      }
    })
  }
}
