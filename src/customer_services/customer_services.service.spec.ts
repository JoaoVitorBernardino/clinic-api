import { Test, TestingModule } from '@nestjs/testing';
import { CustomerServicesService } from './customer_services.service';

describe('CustomerServicesService', () => {
  let service: CustomerServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerServicesService],
    }).compile();

    service = module.get<CustomerServicesService>(CustomerServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
