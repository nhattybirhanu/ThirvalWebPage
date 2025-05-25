import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-subscription-confirmation-modal',
  imports: [],
  templateUrl: './subscription-confirmation-modal.component.html',
  styleUrl: './subscription-confirmation-modal.component.scss',
  standalone:true
})
export class SubscriptionConfirmationModalComponent {
  @Output() closed = new EventEmitter();
  onClose() {
    // hide the modal (Bootstrap JS) and emit close
    const modalEl = document.getElementById('subscriptionModal');
    if (modalEl) {
      // @ts-ignore bootstrap is loaded globally
      const bsModal = bootstrap.Modal.getInstance(modalEl)
      if (bsModal)
      bsModal.hide();
    }
    this.closed.emit();
  }
}
