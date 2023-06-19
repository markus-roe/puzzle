import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private backendService: BackendService, private router: Router) { }

  highscores: Array<{ username: string, score: number }> = [];
  usernameControl = new FormControl('', [Validators.required]);
  scoreControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);

  ngOnInit() {
    if (!localStorage.getItem('Token')) {
      this.router.navigate(['/login']);
    }
  }

  sendHighscore() {
    if (this.usernameControl.value == null || this.usernameControl.invalid || this.scoreControl.invalid || this.scoreControl.value == null) {

      this.snackBar.open("Please fill in all required fields.", "", {
        duration: 3000,
      });
      return;
    }

    const username = this.usernameControl.value;
    const score = Number(this.scoreControl.value);  // Convert score to number before sending

    this.backendService.sendHighscore(username, score).subscribe({
      next: (responseData) => {
        // Handle success - notify user
        this.snackBar.open("Highscore sent successfully.", "", {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error("Failed to send highscore");
        // Handle error - notify user
        this.snackBar.open("Failed to send highscore. Please try again.", "", {
          duration: 3000,
        });
      }
    });
  }

  getHighscores() {
    this.backendService.getHighscores().subscribe({
      next: (responseData) => {
        // Display the highscores
        this.highscores = responseData.highscores;
      },
      error: (error) => {
        console.error("Failed to retrieve highscores");
        // Handle error - notify user
        this.snackBar.open("Failed to retrieve highscores. Please try again.", "", {
          duration: 3000,
        });
      }
    });
  }

  logout() {
    this.backendService.logout().subscribe({
      next: (responseData) => {

        this.snackBar.open("Logout successful.", "", {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Logout failed");

        this.snackBar.open("Logout failed. Please try again.", "", {
          duration: 3000,
        });
      }
    });
  }
}
