import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoComponent } from './recorrido.component';

describe('RecorridoComponent', () => {
  let component: RecorridoComponent;
  let fixture: ComponentFixture<RecorridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecorridoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
