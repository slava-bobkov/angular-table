import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionColumnComponent } from './action-column.component';

describe('ActionColumnComponent', () => {
  let component: ActionColumnComponent;
  let fixture: ComponentFixture<ActionColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
