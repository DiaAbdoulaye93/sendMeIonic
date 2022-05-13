import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenceAdmintransactionPage } from './agence-admintransaction.page';

const routes: Routes = [
  {
    path: '',
    component: AgenceAdmintransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenceAdmintransactionPageRoutingModule {}
