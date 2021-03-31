import { MessageService } from 'primeng/api';
/* Angular Imports */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/*Prime NG Componentes */
import { ConfirmationService } from 'primeng/api';

/* Libs */
import { Subscription } from 'rxjs';

/* Objetos e Serviços */
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { TotalPedidoService } from './total-pedido.service';

@Component({
  selector: 'app-total-pedido',
  templateUrl: './total-pedido.component.html',
  styleUrls: ['./total-pedido.component.scss'],
  providers:[]
})
export class TotalPedidoComponent implements OnInit, OnDestroy {

  subscriptionLanchePersonalizado$:Subscription;
  subscriptionLanchesProntos$:Subscription;
  lanchesProntos:LancheValorPromocao[] = [];
  lanchesPersonalizados:LancheValorPromocao[] = [];
  lanches:LancheValorPromocao[] = [];

  form: FormGroup = new FormGroup({});

  constructor(private totalPedidoService: TotalPedidoService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.form = new FormGroup({
      subtotalPedido: new FormControl(''),
      descontoPedido: new FormControl(''),
      totalPedido: new FormControl(0),
      promocoesPedido: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.verificarLancheAdicionado();
  }

  ngOnDestroy() {
    this.subscriptionLanchesProntos$.unsubscribe();
    this.subscriptionLanchePersonalizado$.unsubscribe();
  }

  somarValorPedido(): void {

    let lanches:LancheValorPromocao[] = [];

    lanches = [...this.lanchesProntos, ...this.lanchesPersonalizados];

    if (lanches && lanches.length > 0) {

      let subtotalPedido: number = 0;
      let descontoPedido: number = 0;
      let promocoesNome: String[] = [];

      lanches.forEach(lanchePersonalizado => {

        subtotalPedido += lanchePersonalizado.valor;
        if (lanchePersonalizado.promocoes) {
          lanchePersonalizado.promocoes.forEach(promo => {

            if (promo.promocao) {
              promocoesNome.push(promo.promocao);
              descontoPedido += promo.valorDesconto;
            }

          });

          if (promocoesNome && promocoesNome.length > 0) {
            this.form.get('promocoesPedido').setValue(promocoesNome.join(', '))
          } else {
           this.form.get('promocoesPedido').setValue("Não há promoções para este pedido.")
          }
        }

      });
      this.setTotaisForm(subtotalPedido, descontoPedido);

    }

  }

  setTotaisForm(subtotalPedido: number, descontoPedido: number) {

    this.form.get('totalPedido').setValue(subtotalPedido - descontoPedido);
    this.form.get('subtotalPedido').setValue(subtotalPedido);
    this.form.get('descontoPedido').setValue(descontoPedido);

  }

  verificarLancheAdicionado(): void {

    this.subscriptionLanchePersonalizado$ = this.totalPedidoService.lanchePersonalizado
      .subscribe((subLanchePersonalizado: LancheValorPromocao) => {
        if (subLanchePersonalizado) {
          this.atualizarLanchePersonalizado(subLanchePersonalizado)
        }
      });

    this.subscriptionLanchesProntos$ = this.totalPedidoService.lanchesProntos
      .subscribe((subLanchesProntos: LancheValorPromocao[]) => {
        this.atualizarLanchesProntos(subLanchesProntos)
      });
  }

  atualizarLanchePersonalizado(subLanchePersonalizado: LancheValorPromocao): void {

    subLanchePersonalizado.ingredientesLancheStr = "";
    subLanchePersonalizado.ingredientesLancheStr = this.montarStringIngredientesNome(subLanchePersonalizado.lanche.ingredientes);
    this.lanchesPersonalizados.push(subLanchePersonalizado);
    this.somarValorPedido()

  }

  atualizarLanchesProntos(subLanchesProntos: LancheValorPromocao[]): void {

    if (subLanchesProntos) {

      const lanchetemp = [...this.lanchesProntos, ...subLanchesProntos]
      this.lanchesProntos = JSON.parse(JSON.stringify(lanchetemp));

      this.somarValorPedido()
    }

  }

  montarStringIngredientesNome(ingredientes:Ingrediente[]): String {

    let nomeIngredientesLanche:String[] = [];
    let ingredientesNomes = [];
    nomeIngredientesLanche = ingredientes.map(i => i.nome);
    ingredientesNomes = Array.from(new Set(nomeIngredientesLanche));

    for (let index = 0; index < ingredientesNomes.length; index++) {
      const element = nomeIngredientesLanche.filter( ing => ing === ingredientesNomes[index]).length;
      if (ingredientesNomes[index]) {
        ingredientesNomes[index] = ingredientesNomes[index] + " - " + element + "UN";
      }

    }

    return ingredientesNomes.join(', ');

  }


  removerLanche(idx: number, tipo: number): void {

    if (tipo === 0) {
      this.lanchesProntos.splice(idx, 1);
    } else {
      this.lanchesPersonalizados.splice(idx, 1);
    }

    this.resetarForm();
    this.somarValorPedido();

  }

  fecharPedido(): void {
    if (this.form.get('totalPedido').value && this.form.get('totalPedido').value > 0) {
      this.confirmationService.confirm({
        message: 'Deseja fechar o pedido?',
        accept: () => {

          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pedido salvo com sucesso'});
          this.resetarForm();
          this.lanchesPersonalizados = [];
          this.lanchesProntos = [];
        }
    });
    }
  }

  resetarForm(): void {
    this.form.reset();
    this.form.get('totalPedido').setValue(0);
  }

}
