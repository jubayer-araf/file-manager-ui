import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string | undefined;
  password: string | undefined;

  constructor(private userService:UserService, private router: Router ){

  }

  login(){

    this.username =  (<HTMLInputElement>document.getElementById("name")).value;
    this.password =  (<HTMLInputElement>document.getElementById("pwd")).value;

    let loginModel = {
      'username' : this.username,
      'password' : this.password
    }

    this.userService.login(loginModel).subscribe((data: any) => {
      console.log( data);
      localStorage.setItem('currentUserToken', data.token);
      this.router.navigate(['/home']);
    });;
  }

}
