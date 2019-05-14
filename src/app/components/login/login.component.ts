import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users = {};
  loginForm: FormGroup;

  constructor( 
      private router: Router, 
      private userService: UserService,
      private fb: FormBuilder,
      private toaster: ToastrService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });

  }

  doLogin() {
    let user = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    //{'email': 'eve.holt@reqres.in', 'password': 'cityslicka'}
    this.userService.userLogin(user)
    .subscribe( 
      userToken => {
        this.toaster.success('Login Successful');
        this.router.navigate(['/user-list']);
      },
      error => this.toaster.error(JSON.stringify(error.error.error).split('"').join(''))
    );
  }

  
}
