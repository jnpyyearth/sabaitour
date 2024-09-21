import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerInfoComponent } from './manager-info.component';

describe('ManagerInfoComponent', () => {
  let component: ManagerInfoComponent;
  let fixture: ComponentFixture<ManagerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
