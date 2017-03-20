import { Router } from '@angular/router';
import { PaymentMode } from './../../../core/models/payment_mode';
import { Observable } from 'rxjs/Rx';
import { PaymentService } from './../services/payment.service';
import { CheckoutService } from './../../../core/services/checkout.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-modes-list',
  templateUrl: './payment-modes-list.component.html',
  styleUrls: ['./payment-modes-list.component.scss']
})
export class PaymentModesListComponent implements OnInit {

  @Input() paymentAmount: number;
  paymentModes: PaymentMode[];
  selectedMode: PaymentMode = new PaymentMode;

  constructor(private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router) {
      this.fetchAllPayments();
  }

  ngOnInit() {
  }

  selectedPaymentMode(mode) {
    this.selectedMode = mode;
  }

  private fetchAllPayments() {
    this.checkoutService.availablePaymentMethods()
      .subscribe((payment) => {
        this.paymentModes = payment.payment_methods;
        this.selectedMode = this.paymentService.setCODAsSelectedMode(this.paymentModes);
      });
  }

  makePayment() {
    const paymentModeId = this.selectedMode.id;
    this.checkoutService.createNewPayment(paymentModeId, this.paymentAmount)
      .subscribe();
    this.router.navigate(['/']);
  }

}