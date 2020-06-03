import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  Usuario = "";

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.authState.subscribe(usu => { if (usu) this.Usuario = usu.displayName })
  }

  salir(): void {
    from(this.auth.signOut()).subscribe(() => {
      this.router.navigate(['/login'])
    })
  }
}
