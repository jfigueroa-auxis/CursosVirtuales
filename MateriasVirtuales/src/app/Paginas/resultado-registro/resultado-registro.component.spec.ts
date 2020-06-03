import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoRegistroComponent } from './resultado-registro.component';

describe('ResultadoRegistroComponent', () => {
  let component: ResultadoRegistroComponent;
  let fixture: ComponentFixture<ResultadoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
