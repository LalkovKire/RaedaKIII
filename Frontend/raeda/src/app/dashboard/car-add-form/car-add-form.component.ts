import { CommonModule, Location } from '@angular/common';
import { Component,OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { LocationService } from '../../services/location.service';
import { CarLocation } from '../dash-service-object';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CarModel } from '../../models/car.model';

@Component({
  selector: 'app-car-add-form',
  standalone: true,
  imports: [DropdownModule,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './car-add-form.component.html',
  styleUrl: './car-add-form.component.css'
})
export class CarAddFormComponent implements OnInit, OnDestroy {

  gearBox = ["Automatic", "Manual"];
  years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  locations: CarLocation[] = [];
  formGroup!: FormGroup;
  carSubscription: Subscription | undefined;
  locationSubscription: Subscription | undefined;
  editMode = false;
  editCar: CarModel | undefined;

  constructor(
    private location: Location,
    private service: LocationService,
    private carService: CarService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnDestroy(): void {
    this.carSubscription?.unsubscribe();
    this.locationSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.loadLocations();
    this.checkEditMode();
  }

  checkEditMode() {
    this.route.queryParamMap
    .subscribe({
      next: (params) => {
        const editMode = params.get('editMode');
        const car = params.get('car');
        if (car && editMode) {
          this.editMode = JSON.parse(editMode);
          this.editCar = JSON.parse(car) as CarModel;
          this.editModeValues();
        } else this.editMode = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description
        })
      }
    });
  }

  editModeValues() {
    this.formGroup.patchValue({
      brand: this.editCar?.brand,
      model: this.editCar?.model,
      type: this.editCar?.carType,
      imageUrl: this.editCar?.image,
      seats: this.editCar?.seats,
      doors: this.editCar?.doors,
      fuel: this.editCar?.fuelType,
      licensePlate: this.editCar?.licensePlate,
      engine: this.editCar?.engine,
      price: this.editCar?.price,
      gearBox: this.editCar?.gearBox,
      location: this.editCar?.location,
      year: this.editCar?.yearMade
    })
  }

  initForm() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.formGroup = new FormGroup(
      {
       brand: new FormControl('', Validators.required),
       model: new FormControl('', Validators.required),
       type: new FormControl('', Validators.required),
       imageUrl: new FormControl('',
        [Validators.required, Validators.pattern(urlRegex)]),
       seats: new FormControl('',
        [Validators.required,Validators.min(2), Validators.max(8)]),
       doors: new FormControl('',
        [Validators.required,Validators.min(2), Validators.max(6)]),
       fuel: new FormControl('', Validators.required),
       licensePlate: new FormControl('',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
       engine: new FormControl('', Validators.required),
       price: new FormControl('',
        [Validators.required, Validators.min(100)]),
       gearBox: new FormControl('', Validators.required),
       location: new FormControl('', Validators.required),
       year: new FormControl('', Validators.required)
      }
    )
  }

  loadLocations(): void {
    this.locationSubscription = this.service.getAllLocations()
    .subscribe({
      next: (loc) => {
        this.locations = loc;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.description
        })
      }
    })
  }

  submitCar(): void {
    const newCar = {
      image: this.formGroup.get('imageUrl')?.value,
      model: this.formGroup.get('model')?.value,
      carType: this.formGroup.get('type')?.value,
      seats: this.formGroup.get('seats')?.value,
      gearBox: this.formGroup.get('gearBox')?.value,
      yearMade: this.formGroup.get('year')?.value,
      doors: this.formGroup.get('doors')?.value,
      fuelType: this.formGroup.get('fuel')?.value,
      engine: this.formGroup.get('engine')?.value,
      price: this.formGroup.get('price')?.value,
      locationID: this.formGroup.get('location')?.value.locationId,
      brand: this.formGroup.get('brand')?.value,
      licensePlate: this.formGroup.get('licensePlate')?.value
    }

    if(this.editMode && this.editCar) {
      this.carService.editCarById(this.editCar.carID,newCar)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: "Car edited successfully"
            })
              this.router.navigateByUrl("/dashboard/cars");
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              detail: err.error.description
            })
          }
        })
    } else {
      this.carSubscription = this.carService.addNewCar(newCar).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: "Car added successfully"
          })
            this.router.navigateByUrl("/dashboard/cars");
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.description
          })
        }
        })
    }
  }

  compareLocations(location1: CarLocation, location2: CarLocation): boolean {
    return location1.locationId === location2.locationId
  }

  goBack(): void {
    this.location.back();
  }
}
