import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistPageComponent } from './whitelist-page.component';

describe('WhitelistPageComponent', () => {
  let component: WhitelistPageComponent;
  let fixture: ComponentFixture<WhitelistPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhitelistPageComponent]
    });
    fixture = TestBed.createComponent(WhitelistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
