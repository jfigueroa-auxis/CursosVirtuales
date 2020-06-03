import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasDisponiblesComponent } from './materias-disponibles.component';

describe('MateriasDisponiblesComponent', () => {
  let component: MateriasDisponiblesComponent;
  let fixture: ComponentFixture<MateriasDisponiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasDisponiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
