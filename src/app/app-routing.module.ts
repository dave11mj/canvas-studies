import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheelRotationComponent } from './pocs/wheel-rotation/wheel-rotation.component';

const routes: Routes = [
  {
    path: '',
    component: WheelRotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
