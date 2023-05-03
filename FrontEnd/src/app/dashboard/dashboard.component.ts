import { Component } from '@angular/core';
import { ProductService } from '../product.service';

import { Router } from '@angular/router';
import { Config } from '../config';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  config=new Config();
  products: any[] = [];



  constructor(private productService: ProductService,private router: Router){}
  ngOnInit() {



    this.getProducts();
}
  getProducts(){
    this.productService.getProducts()
    .subscribe(response => {

      console.log(response);
      if(response.status)
      {
       this.products=response.resultData;
      }
      else{
        console.log(response);
this.router.navigate(['/products']);
      }
    }
    ,
    (error) => {
      this.router.navigate(['']);
      // Handle the error here
    }



    );
  }
  searchName(thisData:any){
    const name=thisData.target.value;
    this.productService.getProductByName(name)
    .subscribe(response => {

      if(response.status)
      {
       this.products=response.resultData;


      }
      else{
        this.getProducts();
      }
    }
    ,
  (error) => {
    //console.log('Error status code: ', error.status);
    this.router.navigate(['']);
    // Handle the error here
  }

    );

  }
  deleteProduct(id:number,name:any){
    if(window.confirm(`Are you sure you want to delete ${name}?`))
    {
      this.productService.deleteProduct(id)
      .subscribe(response => {

        if(response.status)
        {
         this.getProducts();
        }
        else{
  this.router.navigate(['/dashboard']);
        }
      }
      ,
      (error) => {
        //console.log('Error status code: ', error.status);
        this.router.navigate(['']);
        // Handle the error here
      }

      );
    }



  }


}
