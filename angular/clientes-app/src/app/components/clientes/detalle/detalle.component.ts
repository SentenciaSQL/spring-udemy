import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id) {
        this.clienteService.getClienete(id).subscribe(cliente => this.cliente = cliente );
      }
    })
  }

  public seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  public subirFoto(){
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
      this.cliente = cliente;
      Swal.fire('La foto se ha subido completamente!', `La foto se ha subido con exito: ${this.cliente.foto}`, 'success');
    })
  }

}
