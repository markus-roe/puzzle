import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snackBar: MatSnackBar, private backendService: BackendService) { }

  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);

  submit() {
    if (this.emailControl.invalid || this.emailControl.value == null || this.passwordControl.invalid || this.passwordControl.value == null) {
      console.error("Login failed");
      this.snackBar.open("Please fill in all required fields.", "", {
        duration: 3000,
      });
      return;
    }

    const email = this.emailControl.value;
    const password = this.passwordControl.value;

    this.backendService.login(email, password);
  }

}