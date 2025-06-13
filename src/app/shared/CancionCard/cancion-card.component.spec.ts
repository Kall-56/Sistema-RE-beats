import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionCardComponent } from './cancion-card.component';

describe('CancionCardComponent', () => {
  let component: CancionCardComponent;
  let fixture: ComponentFixture<CancionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
