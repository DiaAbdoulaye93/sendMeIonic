import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotComponent } from '../depot/depot.component';

const PAGES = [
  DepotComponent
];

@NgModule({
  declarations: [PAGES],
  exports: [PAGES],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
