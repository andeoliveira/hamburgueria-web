
import { ItemDataview } from '../itens/item-dataview';
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

  @Input() itemDataview: ItemDataview;

  form = new FormGroup({});

  constructor() {
    this.form = new FormGroup({
      itensQuantidade: new FormControl(''),
      subtotal: new FormControl('')
    });

    this.verificarQuantidadeAdd();
  }

  ngOnInit(): void {
    console.log(this.itemDataview)
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
    this.form.get('subtotal').setValue(quantidade * this.itemDataview.valor);
  }

}
