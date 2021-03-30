/*Angular Imports */
import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*Objetos e Serviços */
import { ItemDataview } from '../itens/item-dataview';
import { ItemService } from '../itens/item.service';

/*Libs*/
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() itemDataview:ItemDataview;
  @Output() subtotalEvent: EventEmitter<ItemDataview> = new EventEmitter<ItemDataview>();

  form = new FormGroup({});

  constructor(private itemService: ItemService) {
    this.form = new FormGroup({
      itensQuantidade: new FormControl(''),
      subtotal: new FormControl('')
    });

    this.verificarQuantidadeAdd();
    this.verificarResetCampos();
  }

  ngOnInit(): void {
    this.form.get('subtotal').setValue(0);
  }

  verificarQuantidadeAdd(): void {

    this.form.get('itensQuantidade').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(item => {
        this.calcularValorSubtotal(item)
      });

  }

  calcularValorSubtotal(quantidade:number): void {
    this.form.get('subtotal').setValue(quantidade *  this.itemDataview.valor);
    this.emitirItemTotal();
  }

  emitirItemTotal():void {
    this.itemDataview.quantidadeItens = this.form.get('itensQuantidade').value;
    this.itemDataview.subtotal = this.form.get('subtotal').value;
    this.subtotalEvent.emit(this.itemDataview);
  }

  verificarResetCampos() :void {
    this.itemService.resetarCamposItensESubtotal.subscribe((reset:boolean)  => {
      if(reset) {
        this.form.get('itensQuantidade').setValue(0);
        this.form.get('subtotal').setValue(0)
      }
    });
  }

}
