import { environment } from './../../../environments/environment';
import { Cardapio } from '../itens/cardapio';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CardapioService {

  urlapi = `${environment.api}/cardapio`;

  constructor(private http:HttpClient) {}

  carregarCardapio():Observable<Cardapio> {

    const url = `${this.urlapi}/lanches`;
    return this.http.get(url);

  }
}
