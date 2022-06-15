import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsListElementComponent } from './plants-list-element.component';

describe('PlantsListElementComponent', () => {
  let component: PlantsListElementComponent;
  let fixture: ComponentFixture<PlantsListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
