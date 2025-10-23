import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

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
  private readonly url = 'assets/mock-inventario.json'
  private inventario$ = new BehaviorSubject<Producto[]>([])

  constructor(private http: HttpClient) {
    this.cargarInventarioDesdeMock()
  }

  private cargarInventarioDesdeMock(): void {
    this.http
      .get<Producto[]>(this.url)
      .pipe(
        tap(productos => {
          const inventarioLocal = localStorage.getItem('inventarioActual')
          const inventario = inventarioLocal
            ? JSON.parse(inventarioLocal)
            : productos

          this.inventario$.next(inventario)
          localStorage.setItem('inventarioActual', JSON.stringify(inventario))

          console.log('✅ Inventario cargado:', inventario)
        }),
      )
      .subscribe()
  }

  obtenerInventario(): Observable<Producto[]> {
    return this.inventario$.asObservable()
  }

  obtenerInventarioActual(): Producto[] {
    const data = localStorage.getItem('inventarioActual')
    return data ? JSON.parse(data) : []
  }

  guardarInventario(productos: Producto[]): void {
    localStorage.setItem('inventarioActual', JSON.stringify(productos))
    this.inventario$.next(productos) // 🔔 emite actualización
    console.log('📦 Inventario actualizado y emitido:', productos)
  }
}
