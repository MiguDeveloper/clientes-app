import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from '../../service/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private titulo: string = 'Registrar Cliente';
  private cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal(
          'Nuevo Clientes',
          `Cliente ${cliente.nombre} creado con éxito`,
          'success'
        );
      }
    );
  }

  getCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        );
      }
    });
  }

  update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal(
        'Cliente Actualizado',
        `El cliente ${cliente.nombre} ${cliente.apellido} ha sido actualizado con exito`,
        'success'
      );
    });
  }
}
