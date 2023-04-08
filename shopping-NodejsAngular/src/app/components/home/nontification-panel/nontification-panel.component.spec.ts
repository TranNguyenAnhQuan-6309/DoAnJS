import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NontificationPanelComponent } from './nontification-panel.component';

describe('NontificationPanelComponent', () => {
  let component: NontificationPanelComponent;
  let fixture: ComponentFixture<NontificationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NontificationPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NontificationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
