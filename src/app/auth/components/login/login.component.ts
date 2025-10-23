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
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.http.get('assets/mock-user.json').subscribe({
      next: data => (this.mockUser = data),
      error: err => console.error('❌ Error cargando mock-user.json', err),
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    // Obtenemos los valores ingresados
    const {email, password} = this.loginForm.value

    if (
      this.mockUser &&
      email.trim().toLowerCase() === this.mockUser.email.toLowerCase() &&
      password.trim() === this.mockUser.password
    ) {
      localStorage.setItem('token', this.mockUser.token)

      alert('✅ Inicio de sesión simulado correctamente')

      this.router.navigate(['/dashboard'])
    } else {
      alert('❌ Credenciales incorrectas')
    }
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
