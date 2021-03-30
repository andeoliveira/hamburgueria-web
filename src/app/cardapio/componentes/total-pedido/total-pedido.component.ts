import { FormGroup, FormControl } from '@angular/forms';
import { Ingrediente } from './../../../ingrediente/modelos/ingrediente';
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  form: FormGroup = new FormGroup({});

  constructor(private totalPedidoService: TotalPedidoService) {
    this.form = new FormGroup({
      subtotalPedido: new FormControl(''),
      descontoPedido: new FormControl(''),
      totalPedido: new FormControl(0),
      promocoesPedido: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.verificarLancheAdicionado();
    if (this.lanchesProntos || this.lanchesPersonalizados)
    this.somarValorPedido();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  somarValorPedido(): void {

    if (this.lanchesPersonalizados && this.lanchesPersonalizados.length > 0) {

      let subtotalPedido: number = 0;
      let descontoPedido: number = 0;
      let promocoesNome:String[] = [];

      this.lanchesPersonalizados.forEach(lanchePersonalizado => {

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

      const total:number = subtotalPedido - descontoPedido
      this.form.get('totalPedido').setValue(total);
      this.form.get('subtotalPedido').setValue(subtotalPedido);
      this.form.get('descontoPedido').setValue(descontoPedido);

    }
  }

  verificarLancheAdicionado(): void {

    this.subscription$ = this.totalPedidoService.lanche
      .subscribe(
        (subLancheValor: LancheValorPromocao) => {
        if (subLancheValor) {
          if (subLancheValor.lanche.nome !== 'Lanche Personalizado') {
            this.lanchesProntos.push(subLancheValor);
          } else {
            subLancheValor.ingredientesLancheStr = "";
            subLancheValor.ingredientesLancheStr = this.montarStringIngredientesNome(subLancheValor.lanche.ingredientes);
            this.lanchesPersonalizados.push(subLancheValor);
          }
          this.somarValorPedido();
        }
      }
    )

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

  removerLanchePersonalizado(idx: number): void {
    this.lanchesPersonalizados.splice(idx, 1);
    this.resetarForm();
    this.somarValorPedido();
  }

  resetarForm() {
    this.form.reset();
    this.form.get('totalPedido').setValue(0);
  }

}
