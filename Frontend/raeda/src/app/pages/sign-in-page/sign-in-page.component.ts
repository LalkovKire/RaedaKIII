import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { SignInUser } from '../../models/signInUser.model';
import { BrowserStorageService } from '../../services/browserStorage.service';
import { PasswordModule } from 'primeng/password';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule, PasswordModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
})
export class SignInPageComponent implements OnInit {
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private browserStorageService = inject(BrowserStorageService);
  private router = inject(Router);
  form: FormGroup = new FormGroup({});
  isSubmitting = false;

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) return;

    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;
    this.isSubmitting = true;

    const user = new SignInUser(email, password);
    this.authService.signIn(user).subscribe({
      next: (userInfo) => {
        this.messageService.add({
          severity: 'success',
          detail: `Welcome back ${userInfo.firstName}`,
        });

        this.browserStorageService.saveUserInfoInStorage(
          this.form.get('rememberMe')?.value,
          userInfo
        );

        this.browserStorageService.userAuthentication(userInfo);

        this.router.navigate(['/cars']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          detail: error.error.description,
        });
      },
    });
  }

  private initForm() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rememberMe: new FormControl(null),
    });
  }
}
