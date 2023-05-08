import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);
  confirmPasswordControl = new FormControl('', Validators.required);
  addressControl = new FormControl('', Validators.required);
  cityControl = new FormControl('', Validators.required);
  zipControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);

  submit() {
    if (this.emailControl.invalid || this.passwordControl.invalid || this.confirmPasswordControl.invalid || this.addressControl.invalid || this.cityControl.invalid || this.zipControl.invalid) {
      console.error("Form is invalid!");
      return;
    }

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      console.error("Passwords do not match!");
      return;
    }

  }
}
