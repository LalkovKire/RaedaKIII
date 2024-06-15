import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator';
import { SignUpUser } from '../../models/signUpUser.model';
import { AuthService } from '../../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    InputMaskModule,
    DividerModule,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) return;

    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const email: string = this.form.get('email')?.value;
    const phoneNumber: string = this.form
      .get('phoneNumber')
      ?.value.replaceAll(' ', '');
    const password: string = this.form.get('password')?.value;

    console.log(phoneNumber);

    const newUser = new SignUpUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      0
    );

    this.authService.signUp(newUser).subscribe({
      next: (e) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratulations',
          detail: 'Your account has been successfully created. ',
        });
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: err.error.description,
        });
      },
    });
  }

  private initForm() {
    return new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [Validators.required]),

        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: ConfirmPasswordValidator }
    );
  }
}
