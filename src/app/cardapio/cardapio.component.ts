import { Cardapio } from './itens/Cardapio';
import { LancheValorPromocao } from './../lanche/itens/lanche-valor-promocao';
import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { CardapioService } from './services/cardapio.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  providers: [CardapioService]
})
export class CardapioComponent implements OnInit {

  lanches: LancheValorPromocao [] = [];

  opcoesOrdenacao: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private primengConfig: PrimeNGConfig, private cardapioService: CardapioService) { }

  ngOnInit(): void {

    this.opcoesOrdenacao = [
      {label: 'Maior preço', value: '!valor'},
      {label: 'Menor preço', value: 'valor'}
    ];

    this.primengConfig.ripple = true;

    this.carregarTodosLanches();

  }

  carregarTodosLanches() {
    this.cardapioService.carregarCardapio()
      .pipe(take(1))
      .subscribe((cardapio:Cardapio) => {
        this.lanches = cardapio.lanches
      }, error => {
        console.error(error);
      })
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
