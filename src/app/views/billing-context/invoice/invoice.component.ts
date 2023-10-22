import {Component, OnInit} from '@angular/core';
import {InvoiceApiService} from "../../../core/services/invoice.api.service";
import {ClientApiService} from "../../../core/services/client.api.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  id: any = null;
  senderAddress = '';
  clientAddress = '';
  invoiceNumber = '';
  client: any;
  taxRate = 21;
  paymentMade = 0;
  selectedCurrency: string = 'EUR';
  clients: any = [];
  selectedClient: string;
  invoiceDate: NgbDateStruct; // Use NgbDateStruct for ngbDatepicker
  dueDate: NgbDateStruct;
  items: any[] = [{ description: 'Billable hours', quantity: 1, unitCost: 20 }];
  user: any;
  address: any;
  selectedProject: string;
  projects: any[] = [];
  invoiceTitle: string = '';

  constructor(
      private invoiceApiService: InvoiceApiService,
      private clientApiService: ClientApiService,
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {
    this.invoiceDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    this.dueDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 7 };
  }


  ngOnInit() {
    this.clientApiService.getAll().subscribe((res) => {
      this.clients = res.data;
    });
    this.userService.getUserEntity().subscribe((user) => {
      if (user !== null) {
        this.user = user;
        this.userService.getAddress().subscribe((address: any) => {
          this.address = address;
          if (address !== null) {
            this.senderAddress = `${address.address}, ${address.city}, ${address.county}, ${address.country}, ${address.postcode}`;
          }
        });
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id && this.id !== 'new') {
          this.invoiceApiService.find(`${this.id}`).subscribe((res) => {
            let response = res.data;
            if (response) {
              this.invoiceNumber = response.description;
              this.selectedClient = response.client_id;
              this.selectedProject = response.project_id;
              this.clientAddress = response.payer;
              this.senderAddress = response.recipient;
              this.items = response.items;
              this.selectedCurrency = response.currency;
              this.taxRate = parseFloat(response.tax_rate);
              this.paymentMade = parseFloat(response.amount_paid);
              this.invoiceTitle = response.title;
              this.invoiceDate = this.parseDate(response.create_date);
              this.dueDate = this.parseDate(response.due_date);
              this.updateClientAddress();
            }
          });
        }
      }
    });
  }

  addItem() {
    this.items.push({ description: '', quantity: 1, unitCost: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  subTotal(): number {
    return this.items.reduce((total, item) => total + item.quantity * item.unitCost, 0);
  }

  calculateTax(): number {
    return this.roundToTwoDecimalPlaces((this.taxRate / 100) * this.subTotal());
  }

  // Function to round a number to two decimal places
  roundToTwoDecimalPlaces(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  calculateTotal(): number {
    return this.roundToTwoDecimalPlaces(this.subTotal() + this.calculateTax());
  }

  calculateBalanceDue(): number {
    return this.roundToTwoDecimalPlaces(this.calculateTotal() - this.paymentMade);
  }

  get totalAmount(): number {
    return this.calculateTotal();
  }

  getCurrencySymbol(): string {
    const currencySymbols: any = {
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    return currencySymbols[this.selectedCurrency] || '';
  }

  updateClientAddress() {
    this.clientApiService.find(this.selectedClient).subscribe((res) => {
      this.client = res.data;
      this.projects = res.data.projects;
      if (this.id === null || this.id === 'new') {
        this.invoiceNumber = `${this.client.invoce_prefix}-${this.makeId(6)}`;
      }
      this.clientAddress = this.parseAddress(res.data);
    }, () => {
      this.clientAddress = '';
    });
  }

  makeId(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  parseAddress(client: any) {
    return `${client.address.address}, ${client.address.city}, ${client.address.county}, ${client.address.country}, ${client.address.postcode}, ${client.tax_number}`;
  }

  createInvoiceObject(): any {
    return {
      client_id: this.selectedClient, // Client ID
      project_id: this.selectedProject, // Project ID
      status: 'PENDING', // Status (you can add this if needed)
      recipient: this.senderAddress, // Recipient address
      payer: this.clientAddress, // Payer (sender) address
      items: this.items, // Array of invoice items
      total: this.subTotal().toString(), // Total amount
      description: this.invoiceNumber,
      currency: this.selectedCurrency, // Currency
      tax_rate: this.taxRate.toString(), // Tax rate
      tax_applied: this.calculateTax().toString(), // Tax applied
      total_including_tax: this.calculateBalanceDue().toString(), // Total including tax
      create_date: this.formatDate(this.invoiceDate), // Invoice create date (format date if needed)
      due_date: this.formatDate(this.dueDate), // Due date (format date if needed)
      amount_paid: this.paymentMade.toString(), // Amount paid
      title: this.invoiceTitle, // Invoice title (you can add this if needed)
    };
  }

  formatDate(date: NgbDateStruct): string {
    if (date) {
      return `${date.year}-${date.month}-${date.day}`;
    }
    return '';
  }

  saveInvoice() {
    if (this.id === 'new') {
      this.invoiceApiService.create(this.createInvoiceObject()).subscribe(() => {
        this.router.navigate(['/billing/invoice']);
      });
    } else {
      this.invoiceApiService.update(this.id, this.createInvoiceObject()).subscribe(() => {
        this.router.navigate(['/billing/invoice']);
      });
    }
  }

  confirmDeleteInvoice() {
    this.invoiceApiService.remove(`${this.id}`).subscribe(() => {
      this.router.navigate(['/billing/invoice']);
    });
  }

  async deleteInvoice() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this invoice. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      this.confirmDeleteInvoice(); // Call your deleteInvoice method here
    }
  }


  downloadInvoice() {
    const url = this.invoiceApiService.getDownloadURL(this.id);
    console.log(url);
    window.open(url, '_blank')
  }

  parseDate(dateString: string): NgbDateStruct {
    const dateParts = dateString.split('-');
    return { year: parseInt(dateParts[0]), month: parseInt(dateParts[1]), day: parseInt(dateParts[2]) };
  }
}