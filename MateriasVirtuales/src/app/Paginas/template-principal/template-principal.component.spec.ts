import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePrincipalComponent } from './template-principal.component';

describe('TemplatePrincipalComponent', () => {
  let component: TemplatePrincipalComponent;
  let fixture: ComponentFixture<TemplatePrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
