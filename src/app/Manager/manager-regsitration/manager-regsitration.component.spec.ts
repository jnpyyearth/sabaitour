import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegsitrationComponent } from './manager-regsitration.component';

describe('ManagerRegsitrationComponent', () => {
  let component: ManagerRegsitrationComponent;
  let fixture: ComponentFixture<ManagerRegsitrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerRegsitrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRegsitrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
