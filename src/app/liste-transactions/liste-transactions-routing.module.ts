import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeTransactionsPage } from './liste-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: ListeTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeTransactionsPageRoutingModule {}
