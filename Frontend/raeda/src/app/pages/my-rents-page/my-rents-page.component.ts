import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "../landing-page/navbar/navbar.component";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {MessageService} from "primeng/api";
import {FooterComponent} from "../../components/footer/footer.component";
import {BrowserStorageService} from "../../services/browserStorage.service";
import {RentalService} from "../../services/rental.service";
import {DashRental} from "../../dashboard/dash-service-object";
import {ReviewReq} from "../../models/review-req";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-my-rents-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, DatePipe, RouterLink, DialogModule,
    DialogModule, FormsModule, ReactiveFormsModule, RatingModule],
  templateUrl: './my-rents-page.component.html',
  styleUrl: './my-rents-page.component.css'
})
export class MyRentsPageComponent implements OnInit {
  browserStorageService = inject(BrowserStorageService);
  rentalService = inject(RentalService);
  messageService = inject(MessageService);
  rents: DashRental[] | null = null;
  visible = false;
  form: FormGroup = new FormGroup({});
  user: User | null = null;
  rentalId: number = 0;

  ngOnInit(): void {
    this.user = this.browserStorageService.getUser();

    if (this.user?.email === undefined) return;


    this.rentalService.getUserRentals(this.user.email)?.subscribe({
      next: rents => this.rents = rents,
      error: err => console.log(err)
    });

    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      rating: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.messageService.add({severity: 'error', detail: "Start Selection Required"});
      return;
    }

    if (this.user === null) return;

    const review = new ReviewReq(this.form.value['rating'], this.form.value['description'] ?? null, this.user.email, this.rentalId);

    this.rentalService.postReview(review)?.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Thank you for your review! '
        });
        this.visible = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description ?? 'Unable to submit your review '
        });
      }
    });
  }

  onShowModal(id: number) {
    this.visible = true;
    this.rentalId = id;
  }

  onHideModal() {
    this.form.reset();
  }

}
