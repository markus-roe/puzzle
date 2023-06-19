import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    login(email: string, password: string) {
        return this.http.post<{ Token: string }>('http://localhost:3000/login', { "email": email, "password": password }, this.httpOptions)
            .pipe(
                tap(({ Token }) => {
                    localStorage.setItem('Token', Token);
                })
            );
    }



    signup(email: string, password: string) {
        return this.http.post<{ message: string, Token: string }>('http://localhost:3000/users', { "email": email, "password": password }, this.httpOptions);
    }

    sendHighscore(username: string, score: number) {
        return this.http.post<{ message: string }>('http://localhost:3000/highscores', { username, score }, this.httpOptions);
    }

    getHighscores() {
        return this.http.get<{ highscores: Array<{ username: string, score: number }> }>('http://localhost:3000/highscores');
    }

    logout() {
        localStorage.removeItem('Token');
        return this.http.delete<{ message: string }>('http://localhost:3000/sessions', this.httpOptions);
    }

}
