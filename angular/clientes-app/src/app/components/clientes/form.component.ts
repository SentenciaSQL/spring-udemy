import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      if(id) {
        this.clienteService.getClienete(id).subscribe( (cliente) => this.cliente = cliente );
      }
    })
  }

  public create(form: NgForm): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success');
    }, err => {
      this.errores = err.error.errors as string[];
      console.log("Codigo del error desde el backend: " + err.status );
      console.log(err.error.errors );
    })
  }

  public update(form: NgForm): void {
    this.clienteService.update(this.cliente).subscribe( (json) => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${json.cliente.nombre} actualizado con exito!`, 'success');
    }, err => {
      this.errores = err.error.errors as string[];
      console.log("Codigo del error desde el backend: " + err.status );
      console.log(err.error.errors );
    })
  }

}
