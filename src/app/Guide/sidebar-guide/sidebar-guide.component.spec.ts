import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGuideComponent } from './sidebar-guide.component';

describe('SidebarGuideComponent', () => {
  let component: SidebarGuideComponent;
  let fixture: ComponentFixture<SidebarGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
