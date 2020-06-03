import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';
import { ProfesorService } from '../../../Servicios/profesor.service';
import { Observable } from 'rxjs';
import { Parametros } from '../../../Dominio/Entidades/parametros';

interface usuario {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
  uid?: string;
}

@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {

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

  constructor(private profesorSvc: ProfesorService) { }

  ngOnInit() {
  }

  registrar(): void {
    this.registroEnProceso = true;
    const usuario = this.prepararNuevoUsuario();
    this.crearProfesorEnBD(usuario).subscribe(() => {
      this.Alertas.Exito("Profesor creado de manera exitosa. Él debe establecer su clave a través de la opcion 'olvidé mi contraseña' en la pagina de inicio de sesion.")
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

  private crearProfesorEnBD(usuario: usuario): Observable<void> {
    const profesor = {
      Id: '',
      Apellidos: usuario.apellidos,
      Nombres: usuario.nombres,
      Email: usuario.email,
      Parametros: Parametros.generarParametros(),
      Activo: true
    }
    return this.profesorSvc.crear(profesor);
  }

}
