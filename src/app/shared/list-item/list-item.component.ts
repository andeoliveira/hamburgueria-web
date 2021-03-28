import { ItemDataview } from './itens/item-dataview';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() itemDataview:ItemDataview;

  @Output() subtotal: number;

  form = new FormGroup({});

  constructor() {
    this.form = new FormGroup({
      itensQuantidade: new FormControl(''),
      subtotal: new FormControl('')
    });

    this.verificarQuantidadeAdd();
  }

  ngOnInit(): void {
    this.form.get('subtotal').setValue(0);
  }

  verificarQuantidadeAdd() {

    this.form.get('itensQuantidade').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(item => {
        this.calcularValorSubtotal(item)
      });

  }

  calcularValorSubtotal(quantidade:number) {
    this.form.get('subtotal').setValue(quantidade *  this.itemDataview.valor);
  }

}
