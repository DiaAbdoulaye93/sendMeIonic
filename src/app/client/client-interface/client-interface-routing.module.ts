import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientInterfacePage } from './client-interface.page';

const routes: Routes = [
  {
    path: '',
    component: ClientInterfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientInterfacePageRoutingModule {}
