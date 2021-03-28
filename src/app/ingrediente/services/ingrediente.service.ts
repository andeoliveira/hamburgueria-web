import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Ingrediente } from './../modelos/ingrediente';

@Injectable()
export class IngredienteService {

  urlapi = `${environment.api}/ingrediente`;

  constructor(private http:HttpClient) {}

  buscarIngredientes():Observable<Ingrediente[]> {

    const url = `${this.urlapi}/todos`;
    return this.http.get<Ingrediente[]>(url);

  }
}
