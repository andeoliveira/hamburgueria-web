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
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';
import {GridItemComponent} from './grid-item.component';


@NgModule({

  declarations: [
    GridItemComponent
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
    RatingModule,
    InputNumberModule
  ],

  exports:[
    GridItemComponent
  ],

})

export class GridItemModule { }
