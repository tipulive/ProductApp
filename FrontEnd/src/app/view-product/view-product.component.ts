import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {

  constructor(private ProductService: ProductService){}
  ngOnInit() {

    this.ProductService.getProducts()
    .subscribe(product => {
      console.log(product);
    });

  }

}
