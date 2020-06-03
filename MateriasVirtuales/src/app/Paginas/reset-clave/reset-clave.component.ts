import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AlertasComponent } from '../../Infraestructura/componentes/alertas/alertas.component';

@Component({
  selector: 'app-reset-clave',
  templateUrl: './reset-clave.component.html',
  styleUrls: ['./reset-clave.component.css']
})
export class ResetClaveComponent implements OnInit {

  formEmail = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  @ViewChild('alertas', {static: true})
  Alertas: AlertasComponent

  get email() { return this.formEmail.get('email'); }

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  reset(): void {
    from(this.auth.sendPasswordResetEmail(this.email.value)).subscribe(() => {
      this.Alertas.Exito('Hemos enviado el link de reestablecimiento de clave a tu correo.')
      this.formEmail.disable();
    }, err => {
        switch (err.code) {
          case 'auth/user-not-found':
            this.Alertas.Error('No hay un usuario registrado con la direccion de correo electrónico indicada')
            break;
          default:
            this.Alertas.Error('No fue posible enviar el link de reestablecimiento')
        }
    })
  }

}
