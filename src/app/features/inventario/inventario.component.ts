import {Component, OnInit} from '@angular/core'
import {
  InventarioService,
  Producto,
} from '../../auth/components/login/service/inventario.service'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [] // data original
  productosFiltrados: Producto[] = [] // data visible tras filtro
  filtro = ''
  loading = true
  error = false

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.obtenerInventario().subscribe({
      next: data => {
        this.productos = data
        this.productosFiltrados = data // mostrar todo al inicio
        this.loading = false
      },
      error: err => {
        console.error('❌ Error cargando inventario:', err)
        this.error = true
        this.loading = false
      },
    })
  }

  // Normaliza acentos y hace búsqueda insensible a mayúsculas
  private norm(v: string): string {
    return (v || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita acentos
  }

  aplicarFiltro(): void {
    const t = this.norm(this.filtro.trim())
    this.productosFiltrados = this.productos.filter(
      p =>
        this.norm(p.nombre).includes(t) || this.norm(p.categoria).includes(t),
    )
  }
}
