import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdService } from '../../service/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    productList: any = [];
    updateProdForm: FormGroup;
    
    ngOnInit() {
      this.updateForm()
    }
  
    constructor(
      private actRoute: ActivatedRoute,    
      public prodService: ProdService,
      public fb: FormBuilder,
      private ngZone: NgZone,
      private router: Router
    ) { 
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.prodService.GetProd(id).subscribe((data) => {
        this.updateProdForm = this.fb.group({
          prod_name: [data.prod_name],
          prod_desc: [data.prod_desc]
        })
      })
    }
  
    updateForm(){
      this.updateProdForm = this.fb.group({
        prod_name: [''],
        prod_desc: ['']
      })    
    }
  
    submitForm(){ 
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.prodService.UpdateProd(id, this.updateProdForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      })
    }
}
