import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedValuesColumnComponent } from './combined-values-column.component';

describe('CombinedValuesColumnComponent', () => {
  let component: CombinedValuesColumnComponent;
  let fixture: ComponentFixture<CombinedValuesColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombinedValuesColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedValuesColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
