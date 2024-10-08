import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideRegistrationComponent } from './guide-registration.component';

describe('GuideRegistrationComponent', () => {
  let component: GuideRegistrationComponent;
  let fixture: ComponentFixture<GuideRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuideRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
