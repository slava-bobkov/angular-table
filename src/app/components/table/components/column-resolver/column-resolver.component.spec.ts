import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnResolverComponent } from "./column-resolver.component";

describe("ColumnResolverComponent", () => {
  let component: ColumnResolverComponent<any>;
  let fixture: ComponentFixture<ColumnResolverComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnResolverComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
