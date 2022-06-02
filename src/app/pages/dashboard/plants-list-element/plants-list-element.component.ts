import { Component, Input } from '@angular/core'
import { Plant } from 'src/app/models/plant.model'
import { PlantsService } from 'src/app/services/plants/plants.service'

enum DeleteState {
  WaitingForInput,
  Loading,
  Error,
}

@Component({
  selector: 'app-plants-list-element',
  templateUrl: './plants-list-element.component.html',
  styleUrls: ['./plants-list-element.component.scss']
})
export class PlantsListElementComponent {
  @Input() plant!: Plant

  DeleteState = DeleteState
  deleteState = DeleteState.WaitingForInput

  constructor(public plantsService: PlantsService) { }

  async deletePlant() {
    try {
      this.deleteState = DeleteState.Loading
      await this.plantsService.deletePlant(this.plant.id, !!this.plant.imageDataUrl)
    }
    catch (e) {
      this.deleteState = DeleteState.Error
      console.error(e)
    }
  }

}
