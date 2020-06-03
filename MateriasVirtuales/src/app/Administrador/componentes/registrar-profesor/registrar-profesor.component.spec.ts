import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProfesorComponent } from './registrar-profesor.component';

describe('RegistrarProfesorComponent', () => {
  let component: RegistrarProfesorComponent;
  let fixture: ComponentFixture<RegistrarProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
