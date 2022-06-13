import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMatComponentsModule } from './common-mat-components/common-mat-components.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    CommonMatComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CommonModulesModule { }
