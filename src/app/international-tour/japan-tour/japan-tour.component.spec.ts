import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapanTourComponent } from './japan-tour.component';

describe('JapanTourComponent', () => {
  let component: JapanTourComponent;
  let fixture: ComponentFixture<JapanTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JapanTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JapanTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
