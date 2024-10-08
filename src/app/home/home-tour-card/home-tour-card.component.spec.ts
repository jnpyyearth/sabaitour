import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTourCardComponent } from './home-tour-card.component';

describe('HomeTourCardComponent', () => {
  let component: HomeTourCardComponent;
  let fixture: ComponentFixture<HomeTourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTourCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
