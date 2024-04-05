import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeldasComponent } from './component/celdas/celdas.component';


const routes: Routes = [ 
  {path: "", component: CeldasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
