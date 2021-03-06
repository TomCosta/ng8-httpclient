import { Component, OnInit, NgZone } from '@angular/core';
import { ProdService } from '../../service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  prodForm: FormGroup;
  prodArr: any = [];

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public prodService: ProdService
  ){    
  }

  ngOnInit() {
    this.addProd();
  }

  addProd() {
    this.prodForm = this.fb.group({
      prod_name: ['Notebook'],
      prod_desc: ['Asus 7100XL']
    });
    console.log('Raio X: ', this.prodForm.value);
  }

  submitForm() {
    console.log('mySubmit: ', this.prodForm.value);
    this.prodService.CreateProd(this.prodForm.value).subscribe(res => {
      console.log('Produto: ', res);
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
