import { TestBed, async, inject } from '@angular/core/testing';

import { EsAdministrativoGuard } from './es-administrativo.guard';

describe('EsAdministrativoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsAdministrativoGuard]
    });
  });

  it('should ...', inject([EsAdministrativoGuard], (guard: EsAdministrativoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
