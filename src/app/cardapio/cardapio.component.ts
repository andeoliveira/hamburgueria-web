import { Cardapio } from './itens/Cardapio';
import { LancheValorPromocao } from './../lanche/itens/lanche-valor-promocao';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CardapioService } from './services/cardapio.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  providers: [CardapioService]
})
export class CardapioComponent implements OnInit {

  lanchesProntos: LancheValorPromocao [] = [];
  lanchePersonalizado: LancheValorPromocao;
  carregando:Boolean = false;

  form = new FormGroup({});

  constructor(private primengConfig: PrimeNGConfig, private cardapioService: CardapioService) {
    this.form = new FormGroup({
      itemOrdem: new FormControl('')
    });
   }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.carregarTodosLanches();

  }

  carregarTodosLanches() {

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


  setarLanches(lanches: LancheValorPromocao[]) {
    let idx = lanches.findIndex(i => i.lanche.nome === 'Lanche Personalizado');
    if (idx) {
      this.lanchePersonalizado = lanches[idx];
    } else {
      this.lanchePersonalizado = {};
    }
    this.lanchesProntos = lanches.filter(lanche => lanche.lanche.nome!== 'Lanche Personalizado');
  }


}
