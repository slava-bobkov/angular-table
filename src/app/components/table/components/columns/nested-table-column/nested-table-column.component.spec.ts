import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTableColumnComponent } from './nested-table-column.component';

describe('NestedTableColumnComponent', () => {
  let component: NestedTableColumnComponent;
  let fixture: ComponentFixture<NestedTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
