import {Injectable} from '@angular/core'
import {InventarioService, Producto} from './inventario.service'

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  constructor(private inventarioService: InventarioService) {}

  registrarMovimiento(movimiento: {
    tipo: string
    productoId: number
    cantidad: number
  }): void {
    // 📥 Obtener el inventario actual
    const inventario = this.inventarioService.obtenerInventarioActual()
    const producto = inventario.find(p => p.id === movimiento.productoId)

    if (!producto) {
      alert('⚠️ Producto no encontrado en el inventario')
      return
    }

    // 📊 Actualizar cantidad según el tipo
    if (movimiento.tipo === 'entrada') {
      producto.cantidad += movimiento.cantidad
    } else if (movimiento.tipo === 'salida') {
      if (producto.cantidad < movimiento.cantidad) {
        alert('❌ No hay suficiente stock para esta salida')
        return
      }
      producto.cantidad -= movimiento.cantidad
    }

    // 💾 Guardar y emitir cambio
    this.inventarioService.guardarInventario(inventario)

    // ✅ Feedback
    alert(
      `✅ Movimiento registrado: ${movimiento.tipo} de ${movimiento.cantidad} unidades de ${producto.nombre}`,
    )
    console.log('🔁 Inventario actualizado:', inventario)
  }
}
