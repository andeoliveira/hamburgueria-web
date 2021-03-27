/* Componentes */
import { CardapioComponent } from './cardapio/cardapio.component';

/* Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cardapio',
    loadChildren: () => import('./cardapio/cardapio.module').then(m => m.CardapioModule),
  },
  {  path: '', pathMatch: 'full', redirectTo: 'cardapio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
