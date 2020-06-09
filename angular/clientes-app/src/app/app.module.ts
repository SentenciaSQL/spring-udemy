import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivasComponent } from './components/directivas/directivas.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FormComponent } from './components/clientes/form.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivasComponent,
    HeaderComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-DO'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
