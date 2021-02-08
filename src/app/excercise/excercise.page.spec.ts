import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcercisePage } from './excercise.page';

describe('ExcercisePage', () => {
  let component: ExcercisePage;
  let fixture: ComponentFixture<ExcercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
