import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLetraComponent } from './form-letra.component';

describe('FormLetraComponent', () => {
  let component: FormLetraComponent;
  let fixture: ComponentFixture<FormLetraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLetraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
