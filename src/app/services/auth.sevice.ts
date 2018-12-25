import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) {}
    public token: string;
    public message: string;
    signupUser(email: string, password: string) {
        // firebase.auth().createUserWithEmailAndPassword(email, password).catch(
        //     err => console.log(err)
        // );
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (res) => {
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => {
                        this.token = token;
                        this.router.navigate(['/']);
                    },
                    (reject) => {
                        this.message = 'Something went wrong! Please try again later.';
                    }
                ).catch(err => console.log(err));
            },
            (reject) => {
                this.message = 'Something went wrong! Please try again later.';
            }
        ).catch(
            err => console.log(err)
        );
    }

    isAuthenticated() {
        return this.token != null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
                this.token = token;
            }
        ).catch(err => console.log(err));
        return this.token;
    }

    getUsername() {
        if (this.token) {
            return firebase.auth().currentUser.email.split('@')[0];
        }
        return null;
    }

    logout() {
        this.token = null;
        firebase.auth().signOut();
    }
}
