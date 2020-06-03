import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCursoComponent } from './informacion-curso.component';

describe('InformacionCursoComponent', () => {
  let component: InformacionCursoComponent;
  let fixture: ComponentFixture<InformacionCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
