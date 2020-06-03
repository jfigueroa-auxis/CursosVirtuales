import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCollapsableComponent } from './panel-collapsable.component';

describe('PanelCollapsableComponent', () => {
  let component: PanelCollapsableComponent;
  let fixture: ComponentFixture<PanelCollapsableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCollapsableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCollapsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
