import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetClaveComponent } from './reset-clave.component';

describe('ResetClaveComponent', () => {
  let component: ResetClaveComponent;
  let fixture: ComponentFixture<ResetClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
