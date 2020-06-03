import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAprobadasComponent } from './materias-aprobadas.component';

describe('MateriasAprobadasComponent', () => {
  let component: MateriasAprobadasComponent;
  let fixture: ComponentFixture<MateriasAprobadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasAprobadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
