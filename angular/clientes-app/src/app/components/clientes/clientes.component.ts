import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe( response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    })

    this.modalService.notificarUpload.subscribe((cliente:any) => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    });

  }

  public delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          Swal.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.nombre} eliminado con exito.`,
            'success'
          )
        })
      }
    })
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
