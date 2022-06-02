import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideMessaging, getMessaging } from '@angular/fire/messaging'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { IndexComponent } from './pages/index/index.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UnverifiedComponent } from './pages/unverified/unverified.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { ActionComponent } from './pages/action/action.component'
import { PasswordResetComponent } from './pages/action/modes/password-reset/password-reset.component'
import { EmailVerificationComponent } from './pages/action/modes/email-verification/email-verification.component'
import { PlantsListElementComponent } from './pages/dashboard/plants-list-element/plants-list-element.component'
import { AddPlantComponent } from './pages/add-plant/add-plant.component'
import { PlantFormComponent } from './plant-form/plant-form.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { getStorage, provideStorage } from '@angular/fire/storage'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    DashboardComponent,
    UnverifiedComponent,
    ForgotPasswordComponent,
    ActionComponent,
    PasswordResetComponent,
    EmailVerificationComponent,
    PlantsListElementComponent,
    AddPlantComponent,
    PlantFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
