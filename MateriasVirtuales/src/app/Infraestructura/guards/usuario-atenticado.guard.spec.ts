import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioAtenticadoGuard } from './usuario-atenticado.guard';

describe('UsuarioAtenticadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioAtenticadoGuard]
    });
  });

  it('should ...', inject([UsuarioAtenticadoGuard], (guard: UsuarioAtenticadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
