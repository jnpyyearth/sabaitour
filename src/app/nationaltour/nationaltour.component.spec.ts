import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationaltourComponent } from './nationaltour.component';

describe('NationaltourComponent', () => {
  let component: NationaltourComponent;
  let fixture: ComponentFixture<NationaltourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NationaltourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationaltourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
