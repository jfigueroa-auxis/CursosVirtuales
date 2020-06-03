import { TestBed, async, inject } from '@angular/core/testing';

import { EsEstudianteGuard } from './es-estudiante.guard';

describe('EsEstudianteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsEstudianteGuard]
    });
  });

  it('should ...', inject([EsEstudianteGuard], (guard: EsEstudianteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
