import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaDisponibleComponent } from './materia-disponible.component';

describe('MateriaDisponibleComponent', () => {
  let component: MateriaDisponibleComponent;
  let fixture: ComponentFixture<MateriaDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
