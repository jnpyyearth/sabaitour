import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideInfoCardComponent } from './guide-info-card.component';

describe('GuideInfoCardComponent', () => {
  let component: GuideInfoCardComponent;
  let fixture: ComponentFixture<GuideInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuideInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
