import { LancheValorPromocao } from './../lanche/itens/lanche-valor-promocao';
import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  lanches: LancheValorPromocao [] = [];

  opcoesOrdenacao: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    this.lanches = [
      {
        lanche : {nome: 'X-Bacon'},
        valor: 50.0
      },
      {
        lanche : {nome: 'X-Bacon'},
        valor: 10.0
      },
      {
        lanche : {nome: 'X-Burger'},
        valor: 11.0
      },
      {
        lanche : {nome: 'X-Egg Bacon'},
        valor: 11.0
      },
      {
        lanche : {nome : 'Personaliazdo'},
        valor: 0
      }
    ]

    this.opcoesOrdenacao = [
      {label: 'Maior preço', value: '!valor'},
      {label: 'Menor preço', value: 'valor'}
    ];

    this.primengConfig.ripple = true;

  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

}
