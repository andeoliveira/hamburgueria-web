/* Angular Imports */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

/* Prime NG Componentes */
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';

/*Componentes */
import { ListItemComponent } from './list-item.component';

/*Objetos e Serviços */
import { ItemService } from '../itens/item.service';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    DataViewModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    InputNumberModule

  ],
  exports:[
    ListItemComponent
  ],
  providers: [ItemService]
})

export class ListItemModule { }
