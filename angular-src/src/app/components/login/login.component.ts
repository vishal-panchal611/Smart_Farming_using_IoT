import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    console.log('Button Clicked')
    const user = {
      username : this.username,
      password : this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log('login');
      if(data.success){
        console.log(data);
        console.log('success');
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Logged in successfully', {
          cssClass : 'alert-success',
          timeout : 5000});        
          this.router.navigate(['\profile']);
      }else{
        console.log('success');
        this.flashMessage.show(data.msg, {
          cssClass : 'alert-danger',
          timeout : 5000});        
        this.router.navigate(['\login']);  
      }
    });
  }

}
