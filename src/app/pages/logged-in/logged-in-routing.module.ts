import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInComponent } from './logged-in.component';
import { AddPlantComponent } from './subpages/add-plant/add-plant.component'
import { DashboardComponent } from './subpages/dashboard/dashboard.component'
import { EditPlantComponent } from './subpages/edit-plant/edit-plant.component'

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    children: [
      { path: 'add-plant', component: AddPlantComponent },
      { path: 'edit-plant/:id', component: EditPlantComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedInRoutingModule { }
