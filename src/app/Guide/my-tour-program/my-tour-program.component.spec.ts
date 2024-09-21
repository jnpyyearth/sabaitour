import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourProgramComponent } from './my-tour-program.component';

describe('MyTourProgramComponent', () => {
  let component: MyTourProgramComponent;
  let fixture: ComponentFixture<MyTourProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTourProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTourProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
