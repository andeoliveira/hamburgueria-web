import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  lanches: any = [];

  opcoesOrdenacao: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    this.lanches = [
      {nome: 'X-Bacon', valor: '50.0'},
      {nome: 'X-EGG', valor: '10.0'},
      {nome: 'X-Burger', valor: '11.0'},
      {nome: 'X-Egg Bacon', valor: '11.0'},
      {nome: 'Personalizado', valor: ''}
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
