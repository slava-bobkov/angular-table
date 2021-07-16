import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnComposerComponent } from "./column-composer.component";

describe("ColumnComposerComponent", () => {
  let component: ColumnComposerComponent;
  let fixture: ComponentFixture<ColumnComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComposerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
