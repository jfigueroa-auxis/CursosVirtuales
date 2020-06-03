import { TestBed, async, inject } from '@angular/core/testing';

import { EsProfesorGuard } from './es-profesor.guard';

describe('EsProfesorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsProfesorGuard]
    });
  });

  it('should ...', inject([EsProfesorGuard], (guard: EsProfesorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
