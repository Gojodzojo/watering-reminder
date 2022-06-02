import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormGroupDirective } from '@angular/forms'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { timezones } from './timezones'

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {
  @Input() imageDataUrl!: string
  @Output() imageDataUrlChange = new EventEmitter<string>()

  @Input() isCropping!: boolean
  @Output() isCroppingChange = new EventEmitter<boolean>()

  form!: FormGroup
  imageChangedEvent: any = '';
  timezones = timezones

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit() {
    this.form = this.rootFormGroup.form
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
    this.isCropping = true
    this.isCroppingChange.emit(this.isCropping)
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageDataUrl = event.base64 as string
    this.imageDataUrlChange.emit(this.imageDataUrl)
  }

  loadImageFailed() {
    // show message
  }

  clearImage() {
    this.imageChangedEvent = ''
    this.imageDataUrl = ''
    this.imageDataUrlChange.emit(this.imageDataUrl)
  }

  acceptCropping() {
    this.isCropping = false
    this.isCroppingChange.emit(this.isCropping)
  }

  isInvalid(controlName: string) {
    return (this.form.controls[controlName].dirty || this.form.controls[controlName].touched) && this.form.controls[controlName].errors?.['required']
  }
}
