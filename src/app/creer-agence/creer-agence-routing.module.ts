import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreerAgencePage } from './creer-agence.page';

const routes: Routes = [
  {
    path: '',
    component: CreerAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreerAgencePageRoutingModule {}
