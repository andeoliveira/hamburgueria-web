import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TotalPedidoService } from './total-pedido.service';

@Component({
  selector: 'app-total-pedido',
  templateUrl: './total-pedido.component.html',
  styleUrls: ['./total-pedido.component.scss'],
  providers:[]
})
export class TotalPedidoComponent implements OnInit, OnDestroy {

  subscription$:Subscription;
  lanchesProntos:LancheValorPromocao[];
  lanchesPersonalizados:LancheValorPromocao[] = [];

  constructor(private totalPedidoService: TotalPedidoService) {

  }

  ngOnInit(): void {
    this.verificarLancheAdicionado();
    if (this.lanchesProntos || this.lanchesPersonalizados)
    this.somarValorPedido();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  somarValorPedido() {
    console.log(this.lanchesPersonalizados)
  }

  verificarLancheAdicionado() {
    this.subscription$ = this.totalPedidoService.lanche.subscribe(
      sub => {
        if (sub) {
          if (sub.lanche.nome !== 'Lanche Personalizado') {
            this.lanchesProntos.push(sub);
          } else {
            this.lanchesPersonalizados.push(sub);
            console.log(this.lanchesPersonalizados)
          }
        }
      }
    )
  }

}
