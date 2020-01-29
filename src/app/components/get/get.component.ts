import { ProdService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../service/product';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})

export class GetComponent implements OnInit {

  productList: Array<Product>;

  ngOnInit() {
    this.getProds();
  }

  constructor(
    public prodService: ProdService,
    private router: Router
  ){    
  }

  getProds() {
    this.productList = [];
    return this.prodService.GetProds().subscribe((data: Product) => {
      this.productList.push(data);
    })
  }

  deleteProd(data) {
    var index = index = this.productList.map(x => { return x.prod_name }).indexOf(data.prod_name);
    return this.prodService.DeleteProd(data.id).subscribe(res => {
      this.productList.splice(index, 1)
      console.log('Deletado: ', res);
      this.router.navigateByUrl('/');
    })
  }

}