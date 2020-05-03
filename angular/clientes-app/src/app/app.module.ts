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

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivasComponent,
    HeaderComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
