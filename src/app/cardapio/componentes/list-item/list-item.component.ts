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

  constructor() { }

  ngOnInit(): void {
  }

}
