import { AuthService } from './../../../services/auth.sevice';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).then(
      (value) => {
        this.message = 'A new account has been created. Please go ahead for login!';
        // setTimeout(() => {
        //   this.router.navigate(['/signin']);
        // }, 1200);
        form.reset();
      }
    ).catch(err => this.message = err.message);
  }

}
