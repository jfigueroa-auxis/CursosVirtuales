import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraProgresoCircularComponent } from './barra-progreso-circular.component';

describe('BarraProgresoCircularComponent', () => {
  let component: BarraProgresoCircularComponent;
  let fixture: ComponentFixture<BarraProgresoCircularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraProgresoCircularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraProgresoCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
