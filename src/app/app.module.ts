import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore'
import { provideMessaging, getMessaging } from '@angular/fire/messaging'
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage'
import { connectAuthEmulator } from '@firebase/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging()),
    provideAuth(() => {
      const auth = getAuth()
      if(!environment.production) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
      return auth
    }),
    provideFirestore(() => {
      const firestore = getFirestore()
      if(!environment.production) connectFirestoreEmulator(firestore, 'localhost', 8080)
      enableIndexedDbPersistence(firestore)
      return firestore
    }),
    provideStorage(() => {
      const storage = getStorage()
      if(!environment.production) connectStorageEmulator(storage, 'localhost', 9199)
      return storage
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
