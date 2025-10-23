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

  /** Carga inicial desde el mock */
  private cargarInventarioDesdeMock(): void {
    this.http
      .get<Producto[]>(this.url)
      .pipe(
        tap(productos => {
          const inventarioLocal = localStorage.getItem('inventarioActual')
          const inventario = inventarioLocal
            ? JSON.parse(inventarioLocal)
            : productos

          // 🔄 Emitimos los productos al observable
          this.inventario$.next(inventario)
          localStorage.setItem('inventarioActual', JSON.stringify(inventario))

          console.log('✅ Inventario cargado:', inventario)
        }),
      )
      .subscribe()
  }

  /** Observable reactivo */
  obtenerInventario(): Observable<Producto[]> {
    return this.inventario$.asObservable()
  }

  /** Snapshot actual */
  obtenerInventarioActual(): Producto[] {
    const data = localStorage.getItem('inventarioActual')
    return data ? JSON.parse(data) : []
  }

  /** Guarda y notifica a los componentes */
  guardarInventario(productos: Producto[]): void {
    localStorage.setItem('inventarioActual', JSON.stringify(productos))
    this.inventario$.next(productos) // 🔔 emite actualización
    console.log('📦 Inventario actualizado y emitido:', productos)
  }
}
