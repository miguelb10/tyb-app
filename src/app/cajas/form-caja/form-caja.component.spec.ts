import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCajaComponent } from './form-caja.component';

describe('FormCajaComponent', () => {
  let component: FormCajaComponent;
  let fixture: ComponentFixture<FormCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
