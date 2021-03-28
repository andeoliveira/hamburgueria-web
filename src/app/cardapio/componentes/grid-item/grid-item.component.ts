/*Angular Imports */
import { Component, OnInit, Input } from '@angular/core';

/*Itens e Modelos */
import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';


@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {

  @Input() lancheValorPromocao:LancheValorPromocao;
  descricao: String = "";

  constructor() { }

  ngOnInit(): void {

    if (this.lancheValorPromocao && this.lancheValorPromocao.lanche) {
      this.configurarDescricaoIngredientes();
    }

  }

  configurarDescricaoIngredientes() {
    this.descricao = this.lancheValorPromocao.lanche.ingredientes.map(item => item.nome).join(', ');
  }

}
