import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleAgentPage } from './simple-agent.page';

const routes: Routes = [
  {
    path: '',
    component: SimpleAgentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleAgentPageRoutingModule {}
