import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  StripeService,
  StripeCardNumberComponent,
  StripeCardCvcComponent, StripeCardExpiryComponent
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {SubscriptionApiService} from "../../../../../core/services/subscription.api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  token: any;
  price: any = 4;

  @ViewChild(StripeCardNumberComponent) cardNumberComponent: StripeCardNumberComponent;
  @ViewChild(StripeCardExpiryComponent) cardExpiryComponent: StripeCardExpiryComponent;
  @ViewChild(StripeCardCvcComponent) cardCvcComponent: StripeCardCvcComponent;


  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subscriptionApiService: SubscriptionApiService,
    private stripeService: StripeService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.stripeTest = this.formBuilder.group({
      name: ['', [Validators.required]],
      number_of_employees: [10, Validators.required],
    });
    this.getPrice();
  }

  createToken(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.cardNumberComponent.element, { name })
      .subscribe((result) => {
        console.log(result);
        if (result.token) {
          this.token = result.token.id;
          this.subscriptionApiService.create({
            stripe_token: this.token,
            types: ['time_tracking', 'billing'],
          }).subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Subscription updated successfully',
              didClose: () => {
                this.router.navigate(['dashboard']);
              }
            })
          }, err => {
            Swal.fire({
              icon: "error",
              title: "Payment error",
              text: err.message(),
            });
          })
        } else if (result.error) {
          console.log(result.error.message);
          Swal.fire({
            icon: "error",
            title: "Payment error",
            text: result.error.message,
          });
        }
      }, error => {
        Swal.fire({
          icon: "error",
          title: "Payment error",
          text: error.errors,
        });
      });
  }

  getPrice() {
    this.price = 4;
  }
}
