import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  myForm: FormGroup;
  message:any;

  constructor(private fb: FormBuilder,private productService: ProductService,private router: Router) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      description: ['',  [Validators.required]]
    });
  }

  onSubmit() {
    // This method will be called when the form is submitted


  this.productService.addProduct(this.myForm.value)
    .subscribe(product => {
      if(product.status)
      {
        this.message="Product Added successfully";
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1000);
      }
      else{

      }

    }
    ,
    (error) => {
      //console.log('Error status code: ', error.status);
      this.router.navigate(['']);
      // Handle the error here
    }

    );
    //console.log(this.myForm.value);
  }
}
