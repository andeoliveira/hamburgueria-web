import { take } from 'rxjs/operators';
import { LancheService } from './../../../lanche/services/lanche.service';
/*Prime NG Components */
import { SelectItem } from 'primeng/api';

/* Angular Imports */
import { Component, Input, OnInit } from '@angular/core';
import { LancheValorPromocao } from 'src/app/lanche/itens/lanche-valor-promocao';
import { ItemDataview } from 'src/app/shared/itens/item-dataview';
import { FormGroup, FormControl } from '@angular/forms';

/* Objetos e Serviços */
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { IngredienteService } from './../../../ingrediente/services/ingrediente.service';

@Component({
  selector: 'app-lanche-personalizado',
  templateUrl: './lanche-personalizado.component.html',
  styleUrls: ['./lanche-personalizado.component.scss'],
  providers: [IngredienteService, LancheService]
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

  constructor(private ingredienteService: IngredienteService,
              private lancheService: LancheService) {
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

  buscarTodosIngredientesDisponiveis(): void {

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

  subtotal(itemDataview: ItemDataview): void {
    if (itemDataview) {
      this.gerarIngredientes(itemDataview.itemId, itemDataview.quantidadeItens);
    }
  }

  gerarIngredientes(ingredienteId: number, quantidadeIngrediente: number): void {

    const ingrediente:Ingrediente = this.ingredientes.find(i => i.id === ingredienteId);
    this.lancheValorPromocao.lanche.ingredientes = [];

    for (let index = 1; index <= quantidadeIngrediente; index++) {
      this.lancheValorPromocao.lanche.ingredientes.push(ingrediente);
    }

    this.verificarPromocaoLanche();
  }

  verificarPromocaoLanche() {
    this.lancheService.verificarPromocaoLanche(this.lancheValorPromocao.lanche.id, this.lancheValorPromocao.lanche.ingredientes)
      .pipe(take(1))
      .subscribe(res => {
        console.log(res)
      })
  }

  converterParaItemDataView(ingrediente:Ingrediente):ItemDataview {

    const itemDataview:ItemDataview = {
      descricao : '',
      quantidadeItens : 0,
      subtotal : 0,
      titulo :ingrediente.nome,
      valor :ingrediente.valor,
      imagem : ingrediente.urlimagem,
      itemId : ingrediente.id
    };

    return itemDataview;

  }

}
