import { TestBed } from '@angular/core/testing';
import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
  let service: IdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate an ID with the specified length', () => {
    const length = 6;
    const id = service.createId(length);
    expect(id.toString().length).toEqual(length);
  });

  it('should generate an ID with the default length of 10', () => {
    const id = service.createId();
    expect(id.toString().length).toEqual(10);
  });

  it('should generate a different ID each time it is called', () => {
    const id1 = service.createId();
    const id2 = service.createId();
    expect(id1).not.toEqual(id2);
  });
});
