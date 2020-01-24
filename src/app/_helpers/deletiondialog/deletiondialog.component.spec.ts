import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletiondialogComponent } from './deletiondialog.component';

describe('DeletiondialogComponent', () => {
  let component: DeletiondialogComponent;
  let fixture: ComponentFixture<DeletiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
