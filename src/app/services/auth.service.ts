import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInGuard: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged in Successfully...');
        this.loadUser();
        this.loggedIn.next(true);
        this.loggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.toastr.warning(e);
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('User Logged Out Successfully ..');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.loggedInGuard = false;
      this.router.navigate(['/login']);
    });
  }
  
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
