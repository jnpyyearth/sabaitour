import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGuideComponent } from './navbar-guide.component';

describe('NavbarGuideComponent', () => {
  let component: NavbarGuideComponent;
  let fixture: ComponentFixture<NavbarGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
