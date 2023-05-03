import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  myForm: FormGroup;
  products: any[] = [];
  id:any;
  message:any;
  constructor(private fb: FormBuilder,private productService: ProductService,private router: Router,  private route: ActivatedRoute) {
    this.myForm = this.fb.group({

      name: [null, Validators.required],
      price: ['', [Validators.required]],
      description: ['',  [Validators.required]]
    });
  }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');//get param data from browser

    this.productService.getProductById(this.id)
    .subscribe(response => {
      console.log(response);
      if(response.status)
      {
       this.products=response.resultData;

       for(let i=0; i<this.products.length; i++)
       {
        this.myForm.get("name")?.setValue(this.products[i].name);
        this.myForm.get("price")?.setValue(this.products[i].price);
        this.myForm.get("description")?.setValue(this.products[i].description);
       }
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
  onSubmit() {
    // This method will be called when the form is submitted
 console.log(this.id);

  this.productService.updateProduct(this.id,this.myForm.value)
    .subscribe(product => {
      if(product.status)
      {

        this.message="Product edited Successfully";
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1000);
      }
      else{

      }
     // console.log(product);
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
