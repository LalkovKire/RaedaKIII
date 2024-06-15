import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit {
  private messageService = inject(MessageService);
  form: FormGroup = new FormGroup({});

  onSubmit() {
    console.log(this.form);

    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        detail: 'Successfully subscribed',
      });
      this.form.reset();
    }
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  private initForm() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
}
