import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristDetailsComponent } from './tourist-details.component';

describe('TouristDetailsComponent', () => {
  let component: TouristDetailsComponent;
  let fixture: ComponentFixture<TouristDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouristDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
