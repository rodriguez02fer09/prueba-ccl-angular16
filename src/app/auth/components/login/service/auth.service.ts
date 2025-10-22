import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, map} from 'rxjs'

interface User {
  email: string
  password: string
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUserUrl = 'assets/mock-user.json'

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string,
  ): Observable<{success: boolean; token?: string}> {
    return this.http.get<User>(this.mockUserUrl).pipe(
      map(user => {
        if (email === user.email && password === user.password) {
          localStorage.setItem('token', user.token)
          return {success: true, token: user.token}
        } else {
          return {success: false}
        }
      }),
    )
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }
}
