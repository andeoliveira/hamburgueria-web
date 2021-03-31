/* Angular Imports */
import {RouterModule} from '@angular/router';
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
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';
import {ChipModule} from 'primeng/chip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

/* Componentes Compartilhados */
import { ListItemModule } from './../shared/list-item/list-item.module';

/* Componentes da Regra de Negócio */
import { CardapioComponent } from './cardapio.component';
import { LanchePersonalizadoComponent } from './componentes/lanche-personalizado/lanche-personalizado.component';
import { LancheProntoComponent } from './componentes/lanche-pronto/lanche-pronto.component';
import { TotalPedidoComponent } from './componentes/total-pedido/total-pedido.component';
import { GridItemModule } from './../shared/grid-item/grid-item.module';


const ROUTES = [
 {
   path:'',
    component: CardapioComponent
 }
]
@NgModule({
  declarations: [
    CardapioComponent,
    LanchePersonalizadoComponent,
    LancheProntoComponent,
    TotalPedidoComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
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
    RatingModule,
    InputNumberModule,
    ListItemModule,
    GridItemModule,
    CardModule,
    ChipModule,
    ConfirmDialogModule,
    ToastModule

  ],
  exports:[
    CardapioComponent
  ],
  providers: []
})

export class CardapioModule { }
