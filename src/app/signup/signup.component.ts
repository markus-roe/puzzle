// import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignUpComponent {
//   hidePassword = true;
//   hideConfirmPassword = true;

//   emailControl = new FormControl('', [Validators.required, Validators.email]);
//   passwordControl = new FormControl('', Validators.required);
//   confirmPasswordControl = new FormControl('', Validators.required);
//   addressControl = new FormControl('', Validators.required);
//   cityControl = new FormControl('', Validators.required);
//   zipControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);

//   submit() {
//     if (this.emailControl.invalid || this.passwordControl.invalid || this.confirmPasswordControl.invalid || this.addressControl.invalid || this.cityControl.invalid || this.zipControl.invalid) {
//       console.error("Form is invalid!");
//       return;
//     }

//     if (this.passwordControl.value !== this.confirmPasswordControl.value) {
//       console.error("Passwords do not match!");
//       return;
//     }

//   }
// }
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor(private snackBar: MatSnackBar) { }

  hidePassword = true;
  hideConfirmPassword = true;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordControl = new FormControl('', Validators.required);
  addressControl = new FormControl('');
  cityControl = new FormControl('');
  zipControl = new FormControl('', [Validators.pattern('^[0-9]*$')]);


  submit() {
    if (this.emailControl.invalid || this.passwordControl.invalid || this.confirmPasswordControl.invalid) {
      this.snackBar.open("Please fill in all required fields.", "", {
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

    console.log("Registration successful.");
    this.snackBar.open("Registration successful.", "", {
      duration: 3000,
    });
  }
}