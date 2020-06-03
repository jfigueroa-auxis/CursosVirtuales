import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaSuspendidaComponent } from './materia-suspendida.component';

describe('MateriaSuspendidaComponent', () => {
  let component: MateriaSuspendidaComponent;
  let fixture: ComponentFixture<MateriaSuspendidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaSuspendidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaSuspendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
