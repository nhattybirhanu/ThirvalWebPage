import {Component, ViewChild} from '@angular/core';
import {buildCssProperty} from '../../color.service';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {
  SubscriptionConfirmationModalComponent
} from '../../subscription-confirmation-modal/subscription-confirmation-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    SubscriptionConfirmationModalComponent
  ],
  templateUrl: 'footer.component.html',
  styleUrls:['footer.component.css']
})
export class FooterComponent {
  protected readonly buildCssProperty = buildCssProperty;
  @ViewChild('confirmModal', { static: true })
  confirmModal!: SubscriptionConfirmationModalComponent;
  isDisabled = true;

  openSubscriptionModal() {
    const modalEl = document.getElementById('subscriptionModal');
    // @ts-ignore
    const bsModal = new bootstrap.Modal(modalEl, {});
    bsModal.show();
  }

  constructor(private httpClient:HttpClient) {
  }

  subscribe(email:string){
    this.httpClient.post(`${environment.BASE_URL}/mailing-list/subscribe`, {"email":email}).subscribe({
      next: (res) => {
        this.openSubscriptionModal()
      },
      error: (err) => {
      }
    })
  }

  onModalClosed() {

  }

  emailInput($event: Event) {
    const email = ($event.target as HTMLInputElement).value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.isDisabled  = email.length==0 || !emailPattern.test(email);
  }
}
