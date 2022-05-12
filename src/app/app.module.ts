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
import { USE_EMULATOR } from '@angular/fire/compat/auth'
import { SETTINGS } from '@angular/fire/compat/firestore'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { IndexComponent } from './pages/index/index.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UnverifiedComponent } from './pages/unverified/unverified.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    DashboardComponent,
    UnverifiedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging())
  ],
  providers: [{
    provide: USE_EMULATOR,
    useValue: environment.production ? undefined : ["localhost", 9099]
  },
  {
    provide: SETTINGS,
    useValue: environment.production ? {} : {
      host: 'localhost:8080',
      ssl: false,
    }
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
