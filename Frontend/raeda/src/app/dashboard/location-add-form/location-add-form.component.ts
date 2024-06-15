import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarLocation } from '../dash-service-object';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-add-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-add-form.component.html',
  styleUrl: './location-add-form.component.css'
})
export class LocationAddFormComponent implements OnInit {

  formGroup!: FormGroup;
  editMode = false;
  editLocation: CarLocation | undefined;

  constructor(
    private loc: Location,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private locationService: LocationService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  submitLocation() {
    const tmpLocation = {
      locationName: this.formGroup.get('locationName')?.value,
      locationAddress: this.formGroup.get('locationAddress')?.value
    }

    if(this.editMode && this.editLocation) {
      this.locationService.editLocation(this.editLocation.locationId, tmpLocation)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: "Location edited successfully"
            })
              this.router.navigateByUrl("/dashboard/locations");
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              detail: err.error.description
            })
          }
        })
    } else {
      this.locationService.addNewLocation(tmpLocation)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              detail: "Location edited successfully"
            })
              this.router.navigateByUrl("/dashboard/locations");
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

  initForm() {
    this.formGroup = new FormGroup(
      {
       locationName: new FormControl('', Validators.required),
       locationAddress: new FormControl('', Validators.required)
      }
    )
  }

  checkEditMode() {
    this.route.queryParamMap
    .subscribe({
      next: (params) => {
        const editMode = params.get('editMode');
        const loc = params.get('loc');
        if (loc && editMode) {
          this.editMode = JSON.parse(editMode);
          this.editLocation = JSON.parse(loc) as CarLocation;
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
      locationName: this.editLocation?.locationName,
      locationAddress: this.editLocation?.locationAddress
    })
  }

  goBack() {
    this.loc.back();
  }
}
