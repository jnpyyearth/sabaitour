import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTourCardComponent } from './program-tour-card.component';

describe('ProgramTourCardComponent', () => {
  let component: ProgramTourCardComponent;
  let fixture: ComponentFixture<ProgramTourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramTourCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramTourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
