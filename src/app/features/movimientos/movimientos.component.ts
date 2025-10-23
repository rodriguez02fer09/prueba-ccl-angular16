import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {
  InventarioService,
  Producto,
} from '../../auth/components/login/service/inventario.service'
import {MovimientosService} from '../../auth/components/login/service/movimientos.service'

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
})
export class MovimientosComponent implements OnInit {
  movimientoForm!: FormGroup
  productos: Producto[] = []

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private movimientosService: MovimientosService,
    private router: Router, // ✅ Agregamos Router para la navegación
  ) {}

  ngOnInit(): void {
    this.movimientoForm = this.fb.group({
      tipo: ['', Validators.required],
      productoId: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
    })

    // Cargar lista de productos
    this.inventarioService.obtenerInventario().subscribe({
      next: data => (this.productos = data),
    })
  }

  registrarMovimiento(): void {
    if (this.movimientoForm.invalid) {
      this.movimientoForm.markAllAsTouched()
      return
    }

    // Registrar el movimiento
    this.movimientosService.registrarMovimiento(this.movimientoForm.value)

    // Resetear el formulario
    this.movimientoForm.reset()

    // ✅ Redirigir a la pantalla de consultas (inventario)
    this.router.navigate(['/consultar'])
  }
}
