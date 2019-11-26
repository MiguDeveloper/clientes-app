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
  private errores: string[]; // usamos esta variable para capturar los errores de validacion

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        swal(
          'Nuevo Clientes',
          `${json.mensaje}: ${json.cliente.nombre}`,
          'success'
        );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo de error desde el backend: ' + err.status);
        console.log(err.error.errors);
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
    this.clienteService.updateCliente(this.cliente).subscribe(json => {
        this.router.navigate(['/clientes']);
        swal(
          'Cliente Actualizado',
          `${json.mensaje}: ${json.cliente.nombre}`,
          'success'
        );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo de error desde el backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }
}
