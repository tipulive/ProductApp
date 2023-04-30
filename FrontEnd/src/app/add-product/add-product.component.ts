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
        this.router.navigate(['']);
      }
      else{

      }
      console.log(product);
    });
    //console.log(this.myForm.value);
  }
}
