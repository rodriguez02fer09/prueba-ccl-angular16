import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

// 🚀 Angular Material Modules
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatTableModule} from '@angular/material/table'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatDividerModule} from '@angular/material/divider'

// 🚀 Routing
import {AppRoutingModule} from './app-routing.module'

// 🚀 Components
import {AppComponent} from './app.component'
import {LoginComponent} from './auth/components/login/login.component'
import {DashboardComponent} from './features/dashboard/dashboard.component'
import {InventarioComponent} from './features/inventario/inventario.component'
import {MovimientosComponent} from './features/movimientos/movimientos.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InventarioComponent,
    MovimientosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatDividerModule,

    AppRoutingModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
