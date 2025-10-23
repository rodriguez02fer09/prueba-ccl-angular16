import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}
  irAConsultaInventario(): void {
    console.log('➡️ Redirigiendo a /consultar')
    this.router.navigate(['/consultar'])
  }
  irAMovimiento(): void {
    console.log('➡️ Redirigiendo a/movimientos')
    this.router.navigate(['/movimientos'])
  }
}
