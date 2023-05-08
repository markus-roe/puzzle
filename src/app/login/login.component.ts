import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);
  confirmPasswordControl = new FormControl('', Validators.required);

  submit() {
    if (this.emailControl.invalid || this.passwordControl.invalid || this.confirmPasswordControl.invalid) {
      console.error("Form is invalid!");
      return;
    }

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      console.error("Passwords do not match!");
      return;
    }

    console.log("Email:", this.emailControl.value);
    console.log("Password:", this.passwordControl.value);
  }
}
