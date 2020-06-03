import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertasComponent } from '../../Infraestructura/componentes/alertas/alertas.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { EstudianteService } from '../../Servicios/estudiante.service';
import { flatMap, tap, delay } from 'rxjs/operators';

interface usuario {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
  uid?: string;
}

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  formulario = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)])
  })

  get nombres() { return this.formulario.get('nombres'); }

  get apellidos() { return this.formulario.get('apellidos'); }

  get email() { return this.formulario.get('email'); }

  get telefono() { return this.formulario.get('telefono'); }

  @ViewChild('alertas', { static: true })
  Alertas: AlertasComponent;

  registroEnProceso = false;

  constructor(private auth: AngularFireAuth,
    private router: Router,
    private estudianteSvc: EstudianteService,
  ) { }

  ngOnInit() {
  }

  registrarse(): void {
    this.registroEnProceso = true;
    const usuario = this.prepararNuevoUsuario();
    from(this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)).pipe(
      tap(usu => from(usu.user.updateProfile({ displayName: usuario.nombres + ' ' + usuario.apellidos })).subscribe()),
      delay(2000),
      tap(usu => usu.user.sendEmailVerification()),
      flatMap(usu => {
        usuario.uid = usu.user.uid;
        return this.crearEstudianteEnBD(usuario);
      }),
      delay(2000)
    ).subscribe(() => {
      this.router.navigate(['/confirmacion-registro', { mensaje: "Se te ha enviado un email de verificación al correo eletrónico, por favor confirma tu registro. Tu contraseña es: '" + usuario.password + "'", color: 'verde' }])
      this.registroEnProceso = false;
    }, err => {
      this.Alertas.Error("Ocurrio un error durante el proceso de registro");
      this.registroEnProceso = false;
      console.error(err)
    })

  }

  private prepararNuevoUsuario(): usuario {
    const pass = (this.nombres.value as string).substring(0, 5) + new Date().getFullYear() + '_' + new Date().getDay() + '.';
    const usuario = {
      nombres: this.nombres.value,
      apellidos: this.apellidos.value,
      email: this.email.value,
      telefono: this.telefono.value,
      password: pass,
    } as usuario;
    return usuario;
  }

  private crearEstudianteEnBD(usuario: usuario): Observable<void> {
    const estudiante = {
      Id: usuario.uid,
      Apellidos: usuario.apellidos,
      Nombres: usuario.nombres,
      Email: usuario.email,
      MateriasInscritas: [],
      Activo: true
    }
    return this.estudianteSvc.crear(estudiante)
  }
}
