import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideInfoComponent } from './guide-info.component';

describe('GuideInfoComponent', () => {
  let component: GuideInfoComponent;
  let fixture: ComponentFixture<GuideInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuideInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
