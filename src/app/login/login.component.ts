import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snackBar: MatSnackBar) { }

  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);

  submit() {
    if (this.emailControl.invalid || this.passwordControl.invalid) {
      this.snackBar.open("Please fill in all required fields.", "", {
        duration: 3000,
      });
      return;
    }

    if (this.emailControl.value == "test@test.at" && this.passwordControl.value == "12345678") {
      console.log("Login successful.");
      this.snackBar.open("Login successful.", "", {
        duration: 3000,
      });
    } else {
      console.error("Login failed");
      this.snackBar.open("Incorrect email or password.", "", {
        duration: 3000,
      });
    }
  }
}