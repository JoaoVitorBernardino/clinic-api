import { Test, TestingModule } from '@nestjs/testing';
import { CustomerServicesController } from './customer_services.controller';
import { CustomerServicesService } from './customer_services.service';

describe('CustomerServicesController', () => {
  let controller: CustomerServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerServicesController],
      providers: [CustomerServicesService],
    }).compile();

    controller = module.get<CustomerServicesController>(CustomerServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
