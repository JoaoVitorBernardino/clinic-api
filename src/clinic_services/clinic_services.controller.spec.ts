import { Test, TestingModule } from '@nestjs/testing';
import { ClinicServicesController } from './clinic_services.controller';
import { ClinicServicesService } from './clinic_services.service';

describe('ClinicServicesController', () => {
  let controller: ClinicServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicServicesController],
      providers: [ClinicServicesService],
    }).compile();

    controller = module.get<ClinicServicesController>(ClinicServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
