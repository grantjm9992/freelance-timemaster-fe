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

  numberOfEmployees = [{
    name: '1 - 10 ',
    id: 10,
    price: {
      advanced: 30,
      basic: 20
    }
  }, {
    name: '11 - 20 ',
    id: 20,
    price: {
      advanced: 60,
      basic: 40
    }
  }, {
    name: '21 - 50 ',
    id: 50,
    price: {
      advanced: 150,
      basic: 100
    }
  }]
  numberOfUsers: number = 10;
  type: any;
  token: any;
  price: any;

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
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
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
            types: ['time_tracking'],
            type: this.type,
            number_of_users: this.numberOfUsers,
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
          // Error creating the token
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
    this.price = this.price + 20;
    let selected = this.numberOfEmployees.filter((r) => {
      return r.id === this.stripeTest.get('number_of_employees')?.value;
    });
    let s = selected[0];
    this.price = this.type === 'basic' ? s.price.basic : s.price.advanced;
  }
}
