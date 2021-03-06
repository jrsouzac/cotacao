import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoedasServicesService {
  baseURl = "https://economia.awesomeapi.com.br/json";
  constructor(private http : HttpClient) {
    
   }

  getAll():Observable<any>{
    return this.http.get(this.baseURl+"/all");
  }

  getEspecifico(moeda):Observable<any>{
    return this.http.get(this.baseURl+"/all/"+moeda);
  }

  getVariacao(moeda):Observable<any>{
    return this.http.get(this.baseURl+"/daily/"+moeda+"-BRL/15");
  }

}
