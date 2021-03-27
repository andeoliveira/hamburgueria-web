/* Angular Imports */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* Prime NG Componentes */
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';

/* Componentes */
import { CardapioComponent } from './cardapio.component';

const ROUTES = [
 {
   path:'',
    component: CardapioComponent
 }
]
@NgModule({
  declarations: [
    CardapioComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    DropdownModule,
    PanelModule,
    DialogModule,
    DataViewModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule
  ],
  exports:[
    CardapioComponent
  ],
  providers: []
})

export class CardapioModule { }
