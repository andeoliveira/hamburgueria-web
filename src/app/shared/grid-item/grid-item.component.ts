import { ItemDataview } from 'src/app/shared/list-item/itens/item-dataview';

import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
/*Angular Imports */
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {

  @Input()itemDataView:any;

  form = new FormGroup({});

  constructor() {
    this.form = new FormGroup({
      itensQuantidade: new FormControl(''),
      subtotal: new FormControl('')
    });

    this.verificarQuantidadeAdd();
  }

  ngOnInit(): void {
    console.log(this.itemDataView)
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
    this.form.get('subtotal').setValue(quantidade * this.itemDataView.valor);
  }

}
