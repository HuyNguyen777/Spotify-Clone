import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavAdminComponent } from './top-nav-admin.component';

describe('TopNavAdminComponent', () => {
  let component: TopNavAdminComponent;
  let fixture: ComponentFixture<TopNavAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
