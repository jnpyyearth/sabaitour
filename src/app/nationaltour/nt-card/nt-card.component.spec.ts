import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtCardComponent } from './nt-card.component';

describe('NtCardComponent', () => {
  let component: NtCardComponent;
  let fixture: ComponentFixture<NtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NtCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
