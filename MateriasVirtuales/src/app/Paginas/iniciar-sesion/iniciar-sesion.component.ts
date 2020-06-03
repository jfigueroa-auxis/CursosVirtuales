import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AlertasComponent } from '../../Infraestructura/componentes/alertas/alertas.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  @ViewChild('alertas', {static: true})
  Alertas: AlertasComponent;

  CorreoSinConfirmar = false;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  ingresar(): void {
    const login = this.loginForm.value;
    this.auth.setPersistence('session').then(() => {
      from(this.auth.signInWithEmailAndPassword(login.email, login.password)).subscribe((creden) => {
        if (!creden.user.emailVerified) {
          this.CorreoSinConfirmar = true;
          return;
        }

        creden.user.getIdTokenResult().then(token => {
          if (token.claims.profesor)
            this.router.navigate(['/profesor/miscursos']);
          else if (token.claims.estudiante)
            this.router.navigate(['/estudiante/inscritos']);
          else if (token.claims.administrador)
            this.router.navigate(['/administrador']);
        })

      }, (err) => {
        switch (err.code) {
          case 'auth/user-not-found':
            this.Alertas.Error('No hay un usuario registrado con la direccion de correo electrónico indicada')
            break;
          case 'auth/wrong-password':
            this.Alertas.Error('La contraseña es inválida')
            break;
          case 'auth/user-disabled':
            this.Alertas.Error('Tu usuario ha sido desactivado por un administrador');
            break;
          default:
            this.Alertas.Error('Ocurrió un error intentando autenticarse')
        }
      })
    }).catch(err => console.error(err))
  }

  enviarMailVerificacion(): void {
    this.auth.authState.pipe(flatMap(user => from(user.sendEmailVerification()))).subscribe(() => {
      this.CorreoSinConfirmar = false;
      this.Alertas.Exito("Se te ha enviado el link de verificacion a tu correo electrónico registrado.")
    }, () => this.Alertas.Error("No pudimos enviar el link de verificacion, por favor intentalo de nuevo mas tarde."))
  }


}
