import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasPropiasComponent } from './materias-propias.component';

describe('MateriasPropiasComponent', () => {
  let component: MateriasPropiasComponent;
  let fixture: ComponentFixture<MateriasPropiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasPropiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasPropiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
