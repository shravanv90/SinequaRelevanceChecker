import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevanceCheckerComponent } from './relevance-checker.component';

describe('RelevanceCheckerComponent', () => {
  let component: RelevanceCheckerComponent;
  let fixture: ComponentFixture<RelevanceCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelevanceCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevanceCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
