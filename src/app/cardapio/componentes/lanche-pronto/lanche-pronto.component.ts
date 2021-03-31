import { ItemService } from './../../../shared/itens/item.service';
/* Angular Imports */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/* Componentes */
import { ItemDataview } from 'src/app/shared/itens/item-dataview';

/* Prime NG Componentes */
import { SelectItem } from 'primeng/api';

/* Objetos e Serviços */
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { Lanche } from './../../../lanche/modelos/lanche';
import { TotalPedidoService } from './../total-pedido/total-pedido.service';
import { LancheService } from './../../../lanche/services/lanche.service';

@Component({
  selector: 'app-lanche-pronto',
  templateUrl: './lanche-pronto.component.html',
  styleUrls: ['./lanche-pronto.component.scss']
})
export class LancheProntoComponent implements OnInit {

  @Input() lanches: LancheValorPromocao[];
  lanchesPedido: LancheValorPromocao[] = [];

  /* Configurações do Data View */
  opcoesOrdenacao: SelectItem[];
  ordenacao: number;
  campoOrdenacao: string;
  carregando:Boolean = false;

  form = new FormGroup({});

  constructor(private lancheService: LancheService,
              private totalPedidoService: TotalPedidoService,
              private itemService: ItemService) {
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

  ordenacaoTipo(event): void {
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

  subtotal(itemDataview: ItemDataview): void {
    if (itemDataview) {
      this.adicionarLanchePronto(itemDataview.itemId, itemDataview.quantidadeItens);
    }
  }

  adicionarLanchePronto(lancheid: number, quantidade: number) {

    const lancheValorPromo:LancheValorPromocao  = this.lanches.find(i => i.lanche.id === lancheid);
    const lancheJaAdicionado = this.lanchesPedido.find(l => l.lanche.id === lancheValorPromo.lanche.id);

    if (lancheJaAdicionado) {
        this.lanchesPedido = this.lanchesPedido.filter(l => l.lanche.id !== lancheJaAdicionado.lanche.id);
        this.adicionaLanchePelaQuantidade(lancheValorPromo, quantidade);
      } else {
        this.adicionaLanchePelaQuantidade(lancheValorPromo, quantidade);
      }

  }

  adicionaLanchePelaQuantidade(lancheValorPromo:LancheValorPromocao, quantidade:number): void {
    for (let index = 1; index <= quantidade; index++) {
      this.lanchesPedido.push(lancheValorPromo);
    }
  }

  adicionarLanchesPedido(): void {

    if (this.lanchesPedido && this.lanchesPedido.length > 0) {
      this.totalPedidoService.atualizarLanchesProntos(this.lanchesPedido);
    }
    this.resetarForm();

  }

  resetarForm(): void {
    this.itemService.resetarCamposItensESubtotal.emit(true);
  }

  converterParaItemDataView(lanche: LancheValorPromocao): ItemDataview {

    const itemDataview:ItemDataview = {
      descricao : lanche.lanche.ingredientes ? lanche.lanche.ingredientes.map(ing => ing.nome).join(', ') : null,
      quantidadeItens : 0,
      subtotal : 0,
      titulo :lanche.lanche.nome,
      valor :lanche.valor,
      imagem : lanche.lanche.urlimagem,
      itemId : lanche.lanche.id
    };

    return itemDataview;

  }



}
