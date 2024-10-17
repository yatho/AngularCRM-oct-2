import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ListComponent } from './list.component';
import { AppMaterialModule } from '../../app-material.module';
import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Consumer, ConsumerService } from '../consumer.service';
import { of } from 'rxjs';

const dummyConsumers: Consumer[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    civility: 'M',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane.doe@example.com',
    phone: '1234567890',
    civility: 'Mme',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let consumerMockService = jasmine.createSpyObj('ConsumerService', [
    'getList',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [AppMaterialModule, FormsModule],
      providers: [
        provideHttpClient(),
        provideNoopAnimations(),
        {
          provide: ConsumerService,
          useValue: consumerMockService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    consumerMockService.getList.and.returnValue(of(dummyConsumers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search filtered consumers', () => {
    component['filter'] = 'doe';

    fixture.detectChanges();

    component.search();

    component['consumers$'].subscribe((consumers) => {
      expect(consumers).toEqual(dummyConsumers);
    });
    expect(consumerMockService.getList).toHaveBeenCalled();
  });

  it('should call delete and search methods when remove is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'search');
    consumerMockService.delete = jasmine.createSpy().and.returnValue(of({}));

    component.remove(1);

    expect(window.confirm).toHaveBeenCalledWith(
      `Etes vous sur de supprimer l'entité 1 ?`
    );
    expect(consumerMockService.delete).toHaveBeenCalledWith(1);
    expect(component.search).toHaveBeenCalled();
  });

  it('should not call delete and search methods when remove is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component, 'search');
    consumerMockService.delete = jasmine.createSpy();

    component.remove(1);

    expect(window.confirm).toHaveBeenCalledWith(
      `Etes vous sur de supprimer l'entité 1 ?`
    );
    expect(consumerMockService.delete).not.toHaveBeenCalled();
    expect(component.search).not.toHaveBeenCalled();
  });
});
