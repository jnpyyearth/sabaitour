import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationaltourComponent } from './internationaltour.component';

describe('InternationaltourComponent', () => {
  let component: InternationaltourComponent;
  let fixture: ComponentFixture<InternationaltourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternationaltourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationaltourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
