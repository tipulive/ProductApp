import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;
  message='';
  tokenData=new Config();

  constructor(private fb: FormBuilder,private auth: AuthenticationService,private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]

    });

  }
  validateEmail() {


      if (this.myForm.get('email')?.invalid) {
        this.message="Invalid email";
      }
      else{
        this.message="";
      }


  }
  onSubmit() {
    // This method will be called when the form is submitted


  this.auth.login(this.myForm.value)
    .subscribe(user => {
      if(user.status)
      {
        this.tokenData.setItem("tokenKeys",user.token)
        this.router.navigate(['dashboard']);

      }
      else{
        this.message=user.message;

      }

    });

  }

}
