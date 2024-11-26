import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { Observable } from 'rxjs';
import firebase from 'firebase/auth'
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user$!: Observable<firebase.User | null>
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private _srvAuth:AuthService){}

  ngOnInit(): void{
    this.user$ = this._srvAuth.getUser()
  }

  async onGoogleLogin():Promise<void>{
    this.isLoading=true;
    try {
      await this._srvAuth.loginGoogle();
      console.log('usuario logueado');
    } catch (error) {
      this.errorMessage ='Error en Logeo';
      console.log(error);
    }finally{
      this.isLoading=false;
    }
  }

  async logout():Promise<void>{
    this.isLoading=true;
    try {
      await this._srvAuth.logout();
      console.log('usuario deslogueado');
    } catch (error) {
      this.errorMessage ='Error en deslogeo';
      console.log(error);
    }finally{
      this.isLoading=false;
    }
  }

}
