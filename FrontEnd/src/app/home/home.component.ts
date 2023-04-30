import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Config } from '../config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  config=new Config();
  products: any[] = [];



  constructor(private productService: ProductService,private router: Router){}
  ngOnInit() {
//this.config.setItem("tokenKeys","vubakotwagiye");

console.log(this.config.getToken())


    this.productService.getProducts()
    .subscribe(response => {
      if(response.status)
      {
       this.products=response.resultData;
      }
      else{
this.router.navigate(['/products']);
      }
    });


  }

}
