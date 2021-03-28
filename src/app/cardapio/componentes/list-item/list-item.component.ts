import { LancheValorPromocao } from './../../../lanche/itens/lanche-valor-promocao';
import { Lanche } from './../../../lanche/modelos/lanche';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

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
