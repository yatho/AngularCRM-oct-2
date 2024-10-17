import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ConsumerService, Consumer } from './consumer.service';
import { provideHttpClient } from '@angular/common/http';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsumerService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ConsumerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of consumers', () => {
    const dummyConsumers: Consumer[] = [
      {
        id: 1,
        civility: 'Mr',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        civility: 'Ms',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    service.getList().subscribe((consumers) => {
      expect(consumers.length).toBe(2);
      expect(consumers).toEqual(dummyConsumers);
    });

    const req = httpMock.expectOne('/api/consumers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyConsumers);
  });

  it('should fetch a single consumer by id', () => {
    const dummyConsumer: Consumer = {
      id: 1,
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.get(1).subscribe((consumer) => {
      expect(consumer).toEqual(dummyConsumer);
    });

    const req = httpMock.expectOne('/api/consumers/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyConsumer);
  });

  it('should create a new consumer', () => {
    const newConsumer: Consumer = {
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.create(newConsumer).subscribe((consumer) => {
      expect(consumer).toEqual(newConsumer);
    });

    const req = httpMock.expectOne('/api/consumers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newConsumer);
    req.flush(newConsumer);
  });

  it('should handle error when creating a new consumer', () => {
    const newConsumer: Consumer = {
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.create(newConsumer).subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('/api/consumers');
    expect(req.request.method).toBe('POST');
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('should update a consumer', () => {
    const updatedConsumer: Consumer = {
      id: 1,
      civility: 'Mr',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.update(updatedConsumer).subscribe((consumer) => {
      expect(consumer).toEqual(updatedConsumer);
    });

    const req = httpMock.expectOne(`/api/consumers/${updatedConsumer.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedConsumer);
  });

  it('should delete a consumer by id', () => {
    const consumerId = 1;

    service.delete(consumerId).subscribe((response) => {
      expect(true).toBeTrue();
    });

    const req = httpMock.expectOne(`/api/consumers/${consumerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
