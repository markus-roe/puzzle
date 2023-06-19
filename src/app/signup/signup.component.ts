import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor(private snackBar: MatSnackBar, private backendService: BackendService) { }

  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordControl = new FormControl('', Validators.required);
  addressControl = new FormControl('');
  cityControl = new FormControl('');
  zipControl = new FormControl('', [Validators.pattern('^[0-9]*$')]);

  submit() {
    if (this.emailControl.invalid || this.emailControl.value == null || this.passwordControl.invalid || this.passwordControl.value == null || this.confirmPasswordControl.invalid || this.zipControl.hasError('pattern')) {
      this.snackBar.open("Please correct the form.", "", {
        duration: 3000,
      });
      return;
    }

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      this.snackBar.open("Passwords do not match.", "", {
        duration: 3000,
      });
      return;
    }

    const email = this.emailControl.value;
    const password = this.passwordControl.value;

    this.backendService.signup(email, password).subscribe({
      next: (responseData) => {
        console.log(responseData.message);
        console.log(responseData.Token);

        this.snackBar.open("Registration successful.", "", {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error("Signup failed");

        this.snackBar.open("Registration failed. Please try again.", "", {
          duration: 3000,
        });
      }
    });
  }

}
