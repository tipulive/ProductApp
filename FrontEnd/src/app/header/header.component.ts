import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

import { Router,ActivatedRoute } from '@angular/router';
import { Config } from '../config';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentRoute:any;
  changeLinkName:any;

  tokenData=new Config();
  constructor(private authentication: AuthenticationService,private router: Router,private actRoute: ActivatedRoute){}

  ngOnInit() {
    this.actRoute.url.subscribe(url => {
      this.currentRoute = url.join('/');
      if(this.currentRoute=="")
      {
        this.changeLinkName="";
      }
      else{

        this.changeLinkName="Logout";
      }

    });
  }
  logout(){

    this.authentication.logout()
    .subscribe(response => {
console.log(response);
      if(response.status)
      {

        this.tokenData.deleteToken();
        this.router.navigate(['']);
      }
      else{
this.router.navigate(['/dashboard']);
      }
    });
  }
}
