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

  constructor() { }

  ngOnInit(): void {
  }

}
