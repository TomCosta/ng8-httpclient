import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProdService {

  // urlBase = 'https://products.free.beeceptor.com'; // Use a sua própria url, ou da sua Api ou server real
  urlBase = 'http://localhost:3000';  // Use a url do Json-server para fazer os testes
  
  constructor(
    private http: HttpClient
  ){    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': '14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf'
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
