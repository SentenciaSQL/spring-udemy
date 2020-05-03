import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivasComponent } from './components/directivas/directivas.component';
import { FormComponent } from './components/clientes/form.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'direcivas', component: DirectivasComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
