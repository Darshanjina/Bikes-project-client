import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertpostComponent } from './insertpost.component';

describe('InsertpostComponent', () => {
  let component: InsertpostComponent;
  let fixture: ComponentFixture<InsertpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
