import { Test, TestingModule } from '@nestjs/testing';
import { ClinicServicesService } from './clinic_services.service';

describe('ClinicServicesService', () => {
  let service: ClinicServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicServicesService],
    }).compile();

    service = module.get<ClinicServicesService>(ClinicServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
