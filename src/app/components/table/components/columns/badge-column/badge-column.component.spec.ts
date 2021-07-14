import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeColumnComponent } from './badge-column.component';

describe('BadgeColumnComponent', () => {
  let component: BadgeColumnComponent;
  let fixture: ComponentFixture<BadgeColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
