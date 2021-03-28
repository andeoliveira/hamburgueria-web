import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { Component, Input, OnInit } from '@angular/core';
import { ItemDataview } from 'src/app/shared/itens/item-dataview';

@Component({
  selector: 'app-lanche-pronto',
  templateUrl: './lanche-pronto.component.html',
  styleUrls: ['./lanche-pronto.component.scss']
})
export class LancheProntoComponent implements OnInit {

  @Input() lanches: LancheValorPromocao[];

  /* Configurações do Data View */
  opcoesOrdenacao: SelectItem[];
  ordenacao: number;
  campoOrdenacao: string;
  carregando:Boolean = false;

  form = new FormGroup({});

  constructor() {
    this.form = new FormGroup({
      itemOrdem: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.opcoesOrdenacao = [
      {label: 'Maior preço', value: '!valor'},
      {label: 'Menor preço', value: 'valor'}
    ];

    this.ordenacao = -1;
  }

  ordenacaoTipo(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.ordenacao = -1;
      this.campoOrdenacao = value.substring(1, value.length);
    }
    else {
      this.ordenacao = 1;
      this.campoOrdenacao = value;
    }
  }


  converterParaItemDataView(lanche:LancheValorPromocao):ItemDataview {

    const itemDataview:ItemDataview = {
      descricao : lanche.lanche.ingredientes ? lanche.lanche.ingredientes.map(ing => ing.nome).join(', ') : null,
      quantidadeItens : 0,
      subtotal : 0,
      titulo :lanche.lanche.nome,
      valor :lanche.valor,
      imagem : lanche.lanche.urlimagem
    };

    return itemDataview;

  }



}
