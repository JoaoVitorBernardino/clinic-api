import { Test, TestingModule } from '@nestjs/testing';
import { SelectedServicesService } from './selected_services.service';

describe('SelectedServicesService', () => {
  let service: SelectedServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedServicesService],
    }).compile();

    service = module.get<SelectedServicesService>(SelectedServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
