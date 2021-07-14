import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualColumnComponent } from './textual-column.component';

describe('TextualColumnComponent', () => {
  let component: TextualColumnComponent;
  let fixture: ComponentFixture<TextualColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextualColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextualColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
