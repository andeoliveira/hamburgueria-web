
/*Angular Componentes*/
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/* Prime NG Componentes */
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


/* Libs */
import { take } from 'rxjs/operators';

/* Objetos e Serviços */
import { CardapioService } from './services/cardapio.service';
import { Cardapio } from './itens/Cardapio';
import { LancheValorPromocao } from './../lanche/itens/lanche-valor-promocao';
import { ItemService } from './../shared/itens/item.service';
import { LancheService } from './../lanche/services/lanche.service';
import { TotalPedidoService } from './componentes/total-pedido/total-pedido.service';




@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  providers: [CardapioService, TotalPedidoService, LancheService, ItemService, ConfirmationService, MessageService]
})
export class CardapioComponent implements OnInit {

  lanchesProntos: LancheValorPromocao [] = [];
  lanchePersonalizado: LancheValorPromocao = {};
  lanchesPersonalizados: LancheValorPromocao[] = [];
  carregando:Boolean = false;

  form = new FormGroup({});

  constructor(private primengConfig: PrimeNGConfig,
              private cardapioService: CardapioService) {
    this.form = new FormGroup({
      itemOrdem: new FormControl('')
    });
   }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.carregarTodosLanches();

  }

  carregarTodosLanches(): void {

    this.carregando = true;

    this.cardapioService.carregarCardapio()
      .pipe(take(1))
      .subscribe((cardapio:Cardapio) => {
        this.setarLanches(cardapio.lanches);
      }, error => {
        console.error(error);
      },() => {
        this.carregando = false;
      });

  }


  setarLanches(lanches: LancheValorPromocao[]): void {

    let idx = lanches.findIndex(i => i.lanche.nome === 'Lanche Personalizado');
    if (idx) {
      this.lanchePersonalizado = lanches[idx];
    } else {
      this.lanchePersonalizado = {};
    }

    this.lanchesProntos = lanches.filter(lanche => lanche.lanche.nome!== 'Lanche Personalizado');

  }




}
