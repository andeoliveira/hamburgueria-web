
/* Angular Imports */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemDataview } from 'src/app/shared/itens/item-dataview';
import { FormGroup, FormControl } from '@angular/forms';

/* Libs */
import { take } from 'rxjs/operators';

/*Prime NG Components */
import { SelectItem } from 'primeng/api';

/* Objetos e Serviços */
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { IngredienteService } from './../../../ingrediente/services/ingrediente.service';
import { LancheService } from './../../../lanche/services/lanche.service';
import { LancheValorPromocao } from 'src/app/lanche/itens/lanche-valor-promocao';
import { ItemService } from '../../../shared/itens/item.service';
import { TotalPedidoService } from './../total-pedido/total-pedido.service';

@Component({
  selector: 'app-lanche-personalizado',
  templateUrl: './lanche-personalizado.component.html',
  styleUrls: ['./lanche-personalizado.component.scss'],
  providers: [IngredienteService, LancheService, ItemService]
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
              private lancheService: LancheService,
              private itemService: ItemService,
              private totalPedidoService: TotalPedidoService) {
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
      this.montarLanchePersonalizado(itemDataview.itemId, itemDataview.quantidadeItens);
    }
  }

  montarLanchePersonalizado(ingredienteId: number, quantidade: number): void {

    const ingrediente:Ingrediente = this.ingredientes.find(i => i.id === ingredienteId);

    if (ingrediente) {

      const ingredienteJaAdicionado = this.lancheValorPromocao.lanche.ingredientes.find(ing => ing.id === ingrediente.id);

      if (ingredienteJaAdicionado) {

        this.lancheValorPromocao.lanche.ingredientes = this.lancheValorPromocao.lanche.ingredientes.filter(ing => ing.id !== ingredienteJaAdicionado.id);
        this.adicionaIngredientePelaQuantidade(ingrediente, quantidade)

      } else {
        this.adicionaIngredientePelaQuantidade(ingrediente, quantidade)
      }

    }

  }

  adicionaIngredientePelaQuantidade(ingrediente:Ingrediente, quantidade:number): void {
    for (let index = 1; index <= quantidade; index++) {
      this.lancheValorPromocao.lanche.ingredientes.push(ingrediente);
    }
  }

  verificarPromocaoLanche(lancheId:number, ingredientes:Ingrediente[]): void {
    this.lancheService.verificarPromocaoLanche(lancheId, ingredientes)
      .pipe(take(1))
      .subscribe( (res:LancheValorPromocao) => {
        this.lancheValorPromocao = res;
        this.totalPedidoService.atualizarLanches(this.lancheValorPromocao);
      }, error => {
        console.error(error);
      });
  }

  verificarPromocaoEadicionarLanche():void {
    this.verificarPromocaoLanche(this.lancheValorPromocao.lanche.id, this.lancheValorPromocao.lanche.ingredientes);
    this.resetarForm();
  }

  resetarForm() {
    this.itemService.resetarCamposItensESubtotal.emit(true);
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
