import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprogramCardComponent } from './editprogram-card.component';

describe('EditprogramCardComponent', () => {
  let component: EditprogramCardComponent;
  let fixture: ComponentFixture<EditprogramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprogramCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprogramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
