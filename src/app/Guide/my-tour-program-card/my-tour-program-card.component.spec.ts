import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourProgramCardComponent } from './my-tour-program-card.component';

describe('MyTourProgramCardComponent', () => {
  let component: MyTourProgramCardComponent;
  let fixture: ComponentFixture<MyTourProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTourProgramCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTourProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
