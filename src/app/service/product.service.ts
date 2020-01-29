import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProdService {

  urlBase = 'https://meusprodutos.free.beeceptor.com';

  constructor(
    private http: HttpClient
  ){    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text' as 'json'
  };

  CreateProd(data: Product) {
    return this.http.post(this.urlBase + '/products/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  GetProd(id): Observable<Product> {
    return this.http.get<Product>(this.urlBase + '/products/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  GetProds(): Observable<Product> {
    return this.http.get<Product>(this.urlBase + '/products/', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  UpdateProd(id, data): Observable<Product> {
    return this.http.put<Product>(this.urlBase + '/products/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  DeleteProd(id){
    return this.http.delete<Product>(this.urlBase + '/products/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Client-side error
       errorMessage = error.error.message;
     } else {
       // Server-side error
       errorMessage = `Erro Código: ${error.status}\nMsg: ${error.message}`;
     }
     console.log(`Erro: `, errorMessage);
     return throwError(errorMessage);
  }

}
