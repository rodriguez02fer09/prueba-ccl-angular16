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
  productos: Producto[] = []
  productosFiltrados: Producto[] = []
  filtro = ''
  loading = true
  error = false

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.obtenerInventario().subscribe({
      next: data => {
        console.log('✅ Inventario cargado:', data) // 🔍 verifica en consola
        this.productos = data
        this.productosFiltrados = data
        this.loading = false
      },
      error: err => {
        console.error('❌ Error al cargar inventario:', err)
        this.error = true
        this.loading = false
      },
    })
  }

  aplicarFiltro(): void {
    const term = this.filtro.toLowerCase()
    this.productosFiltrados = this.productos.filter(
      p =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term),
    )
  }
}
