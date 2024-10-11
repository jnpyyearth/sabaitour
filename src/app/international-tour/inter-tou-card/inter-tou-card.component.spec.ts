import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterTouCardComponent } from './inter-tou-card.component';

describe('InterTouCardComponent', () => {
  let component: InterTouCardComponent;
  let fixture: ComponentFixture<InterTouCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterTouCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterTouCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
