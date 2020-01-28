import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { GetComponent } from './components/get/get.component';
import { HttpClientModule } from '@angular/common/http';
import { ProdService } from './service/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

let routes = [
  { path: '', component: GetComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: AddComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    GetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [
    ProdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
