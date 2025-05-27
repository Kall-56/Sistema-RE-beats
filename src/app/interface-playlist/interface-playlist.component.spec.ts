import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePlaylistComponent } from './interface-playlist.component';

describe('InterfacePlaylistComponent', () => {
  let component: InterfacePlaylistComponent;
  let fixture: ComponentFixture<InterfacePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfacePlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
