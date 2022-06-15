import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { LoggedInComponent } from './logged-in.component';
import { DashboardComponent } from './subpages/dashboard/dashboard.component'
import { PlantsListElementComponent } from './subpages/dashboard/plants-list-element/plants-list-element.component'
import { AddPlantComponent } from './subpages/add-plant/add-plant.component'
import { PlantFormComponent } from './plant-form/plant-form.component'
import { CommonModulesModule } from 'src/app/common-modules/common-modules.module'
import { ImageCropperModule } from 'ngx-image-cropper'
import { EditPlantComponent } from './subpages/edit-plant/edit-plant.component'



@NgModule({
  declarations: [
    LoggedInComponent,
    DashboardComponent,
    PlantsListElementComponent,
    AddPlantComponent,
    PlantFormComponent,
    EditPlantComponent
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    LoggedInRoutingModule,
    ImageCropperModule
  ]
})
export class LoggedInModule { }
