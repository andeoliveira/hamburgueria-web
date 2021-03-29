import { Observable } from 'rxjs';
import { Ingrediente } from './../../ingrediente/modelos/ingrediente';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class LancheService {

  urlapi = `${environment.api}/lanche`;

  constructor(private http:HttpClient) {}

  verificarPromocaoLanche(lancheid: number, ingredientes: Ingrediente[]):Observable<any> {

    const url = `${this.urlapi}/calcular/id/${lancheid}`;
    return this.http.post(url, ingredientes);

  }
}
