import { TestBed, async, inject } from '@angular/core/testing';

import { EsAnonimoGuard } from './es-anonimo.guard';

describe('EsAnonimoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsAnonimoGuard]
    });
  });

  it('should ...', inject([EsAnonimoGuard], (guard: EsAnonimoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
