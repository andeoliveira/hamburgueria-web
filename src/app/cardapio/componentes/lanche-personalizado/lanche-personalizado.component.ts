import { FormGroup, FormControl } from '@angular/forms';
import { CardapioService } from './../../services/cardapio.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { Component, Input, OnInit } from '@angular/core';
import { LancheValorPromocao } from 'src/app/lanche/itens/lanche-valor-promocao';

@Component({
  selector: 'app-lanche-personalizado',
  templateUrl: './lanche-personalizado.component.html',
  styleUrls: ['./lanche-personalizado.component.css']
})
export class LanchePersonalizadoComponent implements OnInit {

  @Input() lanche:LancheValorPromocao;

  ingredientes: Ingrediente[] = [];

  /* Configurações do Data View */
  opcoesOrdenacao: SelectItem[];
  ordenacao: number;
  campoOrdenacao: string;
  carregando:Boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(private primengConfig: PrimeNGConfig, private cardapioService: CardapioService) {
    this.form = new FormGroup({
      itemOrdem: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.carregarIngredientesDisponiveis();
  }

  carregarIngredientesDisponiveis() {
    
  }

}
