import {Injectable} from '@angular/core';
import {Cliente} from '../components/clientes/cliente';
import {CLIENTES} from '../components/clientes/clientes.json';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
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
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

}
