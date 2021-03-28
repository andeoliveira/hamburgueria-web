
import { IngredienteService } from './../../../ingrediente/services/ingrediente.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { Component, Input, OnInit } from '@angular/core';
import { LancheValorPromocao } from 'src/app/lanche/itens/lanche-valor-promocao';
import { ItemDataview } from 'src/app/shared/itens/item-dataview';

@Component({
  selector: 'app-lanche-personalizado',
  templateUrl: './lanche-personalizado.component.html',
  styleUrls: ['./lanche-personalizado.component.scss'],
  providers: [IngredienteService]
})
export class LanchePersonalizadoComponent implements OnInit {

  @Input() lancheValorPromocao:LancheValorPromocao;

  ingredientes: Ingrediente[];

  /* Configurações do Data View */
  opcoesOrdenacao: SelectItem[];
  ordenacao: number;
  campoOrdenacao: string;
  carregando:Boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(private ingredienteService: IngredienteService) {
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

    this.buscarTodosIngredientesDisponiveis();
  }

  buscarTodosIngredientesDisponiveis() {

    this.carregando = true;
    this.ingredienteService.buscarIngredientes()
    .subscribe((ingredientes:Ingrediente[])=> {
      this.ingredientes = ingredientes;
    }, error => {
      console.error(error)
    }, () => {
      this.carregando = false;
    });

  }

  converterParaItemDataView(ingrediente:Ingrediente):ItemDataview {

    const itemDataview:ItemDataview = {
      descricao : '',
      quantidadeItens : 0,
      subtotal : 0,
      titulo :ingrediente.nome,
      valor :ingrediente.valor,
      imagem : ingrediente.urlimagem
    };

    console.log(itemDataview)
    return itemDataview;

  }

}
