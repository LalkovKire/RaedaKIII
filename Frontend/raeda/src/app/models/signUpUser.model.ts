export class SignUpUser {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private phoneNumber: string,
    private userPassword: string,
    private role: number
  ) {}
}
