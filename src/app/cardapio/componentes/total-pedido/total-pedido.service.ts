import { Lanche } from './../../../lanche/modelos/lanche';
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class TotalPedidoService {

  private adicionarLancheTotal = new BehaviorSubject<LancheValorPromocao>(null);
  private adicionarLanchesProntos = new BehaviorSubject<LancheValorPromocao[]>(null);

  lanchePersonalizado = this.adicionarLancheTotal.asObservable();
  lanchesProntos = this.adicionarLanchesProntos.asObservable();

  constructor(){}

  atualizarLanches(lanche: LancheValorPromocao) {
    this.adicionarLancheTotal.next(lanche);
  }

  atualizarLanchesProntos(lanchesValorPromo: LancheValorPromocao[]) {
    this.adicionarLanchesProntos.next(lanchesValorPromo);
  }

}
