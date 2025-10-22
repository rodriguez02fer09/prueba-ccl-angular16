import {Component} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup
  mockUser: any = null

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, // 👈 Inyectamos el Router aquí
  ) {
    // Inicializamos el formulario con validaciones reactivas
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    // Cargar el usuario simulado desde el JSON
    this.http.get('assets/mock-user.json').subscribe({
      next: data => (this.mockUser = data),
      error: err => console.error('❌ Error cargando mock-user.json', err),
    })
  }

  onSubmit(): void {
    // Validamos si el formulario es inválido
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    // Obtenemos los valores ingresados
    const {email, password} = this.loginForm.value

    // Validamos contra el mock JSON
    if (
      this.mockUser &&
      email.trim().toLowerCase() === this.mockUser.email.toLowerCase() &&
      password.trim() === this.mockUser.password
    ) {
      // Guardamos el token simulado
      localStorage.setItem('token', this.mockUser.token)

      // Mostramos mensaje
      alert('✅ Inicio de sesión simulado correctamente')

      // 🚀 Redirigimos inmediatamente al Dashboard
      this.router.navigate(['/dashboard'])
    } else {
      alert('❌ Credenciales incorrectas')
    }
  }

  // Getters para acceso rápido desde el HTML
  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
