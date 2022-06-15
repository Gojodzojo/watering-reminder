import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { PlantsService } from 'src/app/services/plants/plants.service'

enum AddPlantState {
  WaitingForInput,
  Loading,
  Error,
}

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent {
  AddPlantState = AddPlantState

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    timezone: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone, Validators.required),
    waterTime: new FormControl('', Validators.required),
  })
  imageUrl = ''
  isCropping = false
  addPlantState = AddPlantState.WaitingForInput

  constructor(public plantsService: PlantsService, public router: Router) { }

  async addPlant() {
    if (this.canAddPlant) {
      try {
        this.addPlantState = AddPlantState.Loading
        await this.plantsService.addPlant(this.form.value, this.imageUrl)
        await this.router.navigate(['/logged-in/dashboard'])
      } catch (error) {
        console.error(error)
        this.addPlantState = AddPlantState.Error
      }
    }
  }

  get canAddPlant() {
    return this.form.valid && !this.isCropping
  }
}
