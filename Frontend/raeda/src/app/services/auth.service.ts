import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInUser } from '../models/signInUser.model';
import { SignUpUser } from '../models/signUpUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signIn(user: SignInUser) {
    return this.http.post<User>(
      'http://localhost:8080/api/auth',
      user
    );
  }

  signUp(newUser: SignUpUser) {
    return this.http.post('http://localhost:8080/api/user', newUser);
  }
}
