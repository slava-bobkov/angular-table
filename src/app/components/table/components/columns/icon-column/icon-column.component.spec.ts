import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconColumnComponent } from './icon-column.component';

describe('IconColumnComponent', () => {
  let component: IconColumnComponent;
  let fixture: ComponentFixture<IconColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
