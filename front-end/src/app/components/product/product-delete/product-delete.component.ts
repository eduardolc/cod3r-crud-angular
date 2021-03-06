import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderData } from '../../tamplate/header/header-data.model';
import { HeaderService } from '../../tamplate/header/header.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private headerService: HeaderService
  ) {
    this.headerService.headerData = new HeaderData('Deletar Produto', 'storefront', 'products/delete');
   }

  ngOnInit(): void {
    this.product = new Product();
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(
      product => {
        this.product = product;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(
      () => {
        this.productService.showMessage('Produto excluido com sucesso!');
        this.router.navigate(['/products']);
      }
    )
  }

}
