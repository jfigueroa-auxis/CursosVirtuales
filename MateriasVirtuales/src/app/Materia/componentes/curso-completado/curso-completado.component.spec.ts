import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoCompletadoComponent } from './curso-completado.component';

describe('CursoCompletadoComponent', () => {
  let component: CursoCompletadoComponent;
  let fixture: ComponentFixture<CursoCompletadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoCompletadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoCompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
