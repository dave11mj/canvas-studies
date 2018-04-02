import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheelRotation3dComponent } from './pocs/wheel-rotation-3d/wheel-rotation-3d.component';

const routes: Routes = [
  {
    path: '',
    component: WheelRotation3dComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
