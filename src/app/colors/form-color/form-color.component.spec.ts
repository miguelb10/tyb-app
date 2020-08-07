import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColorComponent } from './form-color.component';

describe('FormColorComponent', () => {
  let component: FormColorComponent;
  let fixture: ComponentFixture<FormColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
