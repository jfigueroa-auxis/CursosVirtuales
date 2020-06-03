import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComunComponent } from './panel-comun.component';

describe('PanelComunComponent', () => {
  let component: PanelComunComponent;
  let fixture: ComponentFixture<PanelComunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
