import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WheelRotationComponent } from './pocs/wheel-rotation/wheel-rotation.component';
import { WheelRotation3dComponent } from './pocs/wheel-rotation-3d/wheel-rotation-3d.component';


@NgModule({
  declarations: [
    AppComponent,
    WheelRotationComponent,
    WheelRotation3dComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
