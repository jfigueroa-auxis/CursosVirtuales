import { TestBed, async, inject } from '@angular/core/testing';

import { MateriaEstaActivaGuard } from './materia-esta-activa.guard';

describe('MateriaEstaActivaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MateriaEstaActivaGuard]
    });
  });

  it('should ...', inject([MateriaEstaActivaGuard], (guard: MateriaEstaActivaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
