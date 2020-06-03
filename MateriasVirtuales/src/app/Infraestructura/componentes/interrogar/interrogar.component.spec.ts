import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogarComponent } from './interrogar.component';

describe('InterrogarComponent', () => {
  let component: InterrogarComponent;
  let fixture: ComponentFixture<InterrogarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterrogarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterrogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
