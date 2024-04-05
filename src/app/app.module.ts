import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CeldasComponent } from './component/celdas/celdas.component';
import { TecladoComponent } from './component/teclado/teclado.component';

@NgModule({
  declarations: [
    AppComponent,
    CeldasComponent,
    TecladoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
