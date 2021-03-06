import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Plant, PlantWithoutImage } from 'src/app/models/plant.model'
import { PlantsService } from 'src/app/services/plants/plants.service'

enum EditPlantState {
  LoadingPage,
  WaitingForInput,
  UpdatingPlant,
  UpdatingError,
  DeletingPlant,
  DeletingError,
}

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.scss']
})
export class EditPlantComponent {
  EditPlantState = EditPlantState

  originalPlant!: Plant
  form!: FormGroup
  imageUrl!: string
  editPlantState = EditPlantState.LoadingPage
  isCropping = false

  constructor(private route: ActivatedRoute, private plantsService: PlantsService, private router: Router) {
    this.route.params.subscribe(async (params) => {
      try {
        this.originalPlant = await plantsService.getPlant(params['id'])

        this.form = new FormGroup({
          name: new FormControl(this.originalPlant.name, Validators.required),
          description: new FormControl(this.originalPlant.description),
          timezone: new FormControl(this.originalPlant.timezone, Validators.required),
          waterTime: new FormControl(this.originalPlant.waterTime, Validators.required),
        })
        this.imageUrl = this.originalPlant.imageUrl

        this.editPlantState = EditPlantState.WaitingForInput
      } catch (error) {
        await this.router.navigate(['/logged-in/dashboard'])
      }
    })
  }

  async updatePlant() {
    if (this.canUpdatePlant) {
      try {
        this.editPlantState = EditPlantState.UpdatingPlant

        let dataToUpdate: Partial<PlantWithoutImage> = {}

        if (this.form.value.name !== this.originalPlant.name) dataToUpdate.name = this.form.value.name
        if (this.form.value.description !== this.originalPlant.description) dataToUpdate.description = this.form.value.description
        if (this.form.value.timezone !== this.originalPlant.timezone) dataToUpdate.timezone = this.form.value.timezone
        if (this.form.value.waterTime !== this.originalPlant.waterTime) dataToUpdate.waterTime = this.form.value.waterTime

        await this.plantsService.updatePlant(
          this.originalPlant.id,
          dataToUpdate,
          this.imageUrl !== this.originalPlant.imageUrl ? this.imageUrl : undefined
        )
        await this.router.navigate(['/logged-in/dashboard'])
      } catch (error) {
        console.error(error)
        this.editPlantState = EditPlantState.UpdatingError
      }
    }
  }

  async deletePlant() {
    try {
      this.editPlantState = EditPlantState.DeletingPlant
      await this.plantsService.deletePlant(this.originalPlant.id, !!this.originalPlant.imageUrl)
      await this.router.navigate(['/logged-in/dashboard'])
    } catch (error) {
      console.error(error)
      this.editPlantState = EditPlantState.DeletingError
    }
  }

  get canUpdatePlant() {
    return this.form.valid && !this.isCropping
  }
}


