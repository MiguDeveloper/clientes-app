import {Injectable} from '@angular/core';
import {Cliente} from '../components/clientes/cliente';
import {CLIENTES} from '../components/clientes/clientes.json';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {
  }

  // Metodo getClientes(): permite listar todos los clientes
  getClientes(): Observable<Cliente[]> {

    // Al momento de hacer la solicitud al endpoint este nos devuelve un tipo especifico por eso debemos de hacer un CAST
    // ya que nos retorna un ANY un tipo generico
    return this.http.get<Cliente[]>(this.urlEndPoint);

    // Una manera de evitar el CAST podemos usar el MAP
    //  return this.http.get(this.urlEndPoint).pipe(
    //    map(response => response as Cliente[])
    //  );

    // aqui es cuando consumimos del archivo estatico json y lo retornamos a la vista
    // return of(CLIENTES);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje);
        swal(
          'Error al crear cliente',
          err.error.mensaje,
          'error'
        );
        return throwError(err);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(err => {
        this.router.navigate(['/clientes']);
        console.log(err.error.mensaje);
        swal(
          'Error al editar',
          err.error.mensaje,
          'error'
        );
        return throwError(err);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje);
        swal(
          'Error al actualizar cliente',
          err.error.mensaje,
          'error'
        );
        return throwError(err);
      })
    );
  }

  deleteCliente(id): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.log(err.error.mensaje);
        swal(
          'Error al eliminar cliente',
          err.error.mensaje,
          'error'
        );
        return throwError(err);
      })
    );
  }

}
