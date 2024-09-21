import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideIntourComponent } from './guide-intour.component';

describe('GuideIntourComponent', () => {
  let component: GuideIntourComponent;
  let fixture: ComponentFixture<GuideIntourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuideIntourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideIntourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
