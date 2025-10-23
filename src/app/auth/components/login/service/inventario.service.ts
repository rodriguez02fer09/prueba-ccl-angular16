import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

export interface Producto {
  id: number
  nombre: string
  categoria: string
  cantidad: number
  precioUnitario: number
}

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private readonly url = '/assets/mock-inventario.json'

  constructor(private http: HttpClient) {}

  obtenerInventario(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
  }
}
