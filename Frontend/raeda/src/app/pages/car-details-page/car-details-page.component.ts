import {Component, effect, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../landing-page/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../services/car.service';
import {CarModel} from '../../models/car.model';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Location, NgIf} from '@angular/common';
import {DateService} from '../../services/date.service';
import {InfoComponent} from '../../components/info/info.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserStorageService} from '../../services/browserStorage.service';
import {WarningComponent} from '../../components/warning/warning.component';
import {RentalService} from '../../services/rental.service';
import {RentalModel} from '../../models/rental.model';
import {MessageService} from 'primeng/api';
import {DatesModel} from '../../models/dates.model';
import {InputOtpModule} from "primeng/inputotp";
import {ChipsModule} from "primeng/chips";
import {User} from "../../models/user.model";
import {ReviewModal} from "../../models/review.modal";
import {StartsComponent} from "../../components/starts/starts.component";

@Component({
  selector: 'app-car-details-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    InfoComponent,
    DialogModule,
    WarningComponent,
    InputOtpModule,
    NgIf,
    ChipsModule,
    FormsModule,
    StartsComponent,
    InfoComponent
  ],
  templateUrl: './car-details-page.component.html',
  styleUrl: './car-details-page.component.css',
})
export class CarDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private location = inject(Location);
  private date = inject(DateService);
  private browserStorageService = inject(BrowserStorageService);
  private rentalService = inject(RentalService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private dateService = inject(DateService);

  car: CarModel | undefined;
  review: ReviewModal | undefined;
  form: FormGroup = new FormGroup({});
  formOTP: FormGroup = new FormGroup({});
  minDatePickup = new Date();
  minDateReturn = new Date();
  maxDate: Date | null = null;
  locations = ['Skopje', 'Strumica', 'Kavadarci'];
  dayDuration = 1;
  total = 0;
  visible = false;
  visibleOTP = false;
  isLoggedIn = false;
  dates: DatesModel[] = [];
  pickup: Date[] = [];
  value: number = 0;
  user: User | null = null;
  Math = Math


  constructor() {
    effect(() => {
      this.isLoggedIn = this.browserStorageService.isSignIn();
      this.user = this.browserStorageService.getUser();
    });
  }

  ngOnInit(): void {
    this.form = this.initForm();
    this.formOTP = this.initFormOTP();

    this.route.params.subscribe(({id}) => {
      this.carService.getCar(+id).subscribe(car => {
        this.car = car;
        this.total = this.calculateTotalPrice(car);
      });

      this.carService.getCarDates(+id).subscribe(dates => {
        this.dates = dates;
        this.processCarDates(dates);
      });

      this.carService.getCarReview(+id).subscribe(review => {
        this.review = review;
      });
    });

    this.form.get('pickupDate')?.valueChanges.subscribe((val) => {
      this.form.get('returnDate')?.setValue(val);
      this.minDateReturn = val;

      this.maxDropOffDate(val);

    });

    this.form.get('returnDate')?.valueChanges.subscribe(() => {
      const pickupDate = this.form.get('pickupDate')?.value;
      const returnDate = this.form.get('returnDate')?.value;

      this.dayDuration = this.date.dateDiffInDays(pickupDate, returnDate) + 1;

      if (this.car?.price)
        this.total = this.car.price * this.dayDuration;
    });
  }

  private calculateTotalPrice(car: CarModel): number {
    return (car?.price ?? 0) * this.dayDuration;
  }

  private processCarDates(dates: DatesModel[]): void {
    dates.forEach((date) => {
      const disablePickupDates = this.dateService.getDatesBetween(
        new Date(date.pickup),
        new Date(date.dropOff)
      );
      this.pickup.push(...disablePickupDates);
      let firstAvailableDate = this.dateService.pickup ?? new Date();

      this.pickup
        .sort(this.dateService.compareDates)
        .forEach((date) => {
          if (date.getDate() === firstAvailableDate.getDate()) {
            firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);
          }
        });

      this.form.patchValue({pickupDate: firstAvailableDate});

      this.maxDropOffDate(firstAvailableDate);
    });
  }

  private initForm() {
    const date = this.dateService.pickup ?? new Date();

    return new FormGroup({
      pickupDate: new FormControl(date, Validators.required),
      returnDate: new FormControl(date, Validators.required),
    });
  }

  private initFormOTP() {
    return new FormGroup({
      thousands: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(9)]),
      hundreds: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9)]),
      tens: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9)]),
      ones: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(9)]),
    });
  }

  onSubmit() {
    this.visible = true;
  }

  onSubmitOTP() {
    if (!this.formOTP.valid) {
      this.messageService.add({
        severity: 'error',
        detail: 'OTP form is not valid',
      });
      return;
    }

    const otp = +this.formOTP.value['thousands'] * 1000 +
      +this.formOTP.value['hundreds'] * 100 +
      +this.formOTP.value['tens'] * 10 +
      +this.formOTP.value['ones'];

    const pickupTime = this.dateService.convertToISOString(
      this.form.value['pickupDate']
    );
    const dropOffTime = this.dateService.convertToISOString(
      this.form.value['returnDate']
    );

    const carId = this.car?.carID;
    let email = this.user?.email;
    const locationId = this.car?.location.locationId;

    if (carId === undefined || email === undefined || locationId === undefined)
      return;

    const rental = new RentalModel(
      pickupTime,
      dropOffTime,
      carId,
      email,
      locationId,
      otp
    );


    this.rentalService.rentACar(rental).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'This car is successfully rented',
        });
        this.visibleOTP = false;
        this.router.navigate(['/my-rents']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description ?? err.error,
        });
      },
    });
  }

  onRentACar() {
    if (this.user?.phoneNumber === undefined) return;

    this.rentalService.preRentACar(this.user.phoneNumber).subscribe();

    this.visible = false;
    this.visibleOTP = true;
  }

  onGoBack() {
    this.location.back();
  }

  private maxDropOffDate(val: Date) {
    let date = this.dates.find((date) => val < new Date(date.pickup));

    if (!date) {
      this.maxDate = null;
      return;
    }

    this.maxDate = new Date(date.pickup);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }
}
