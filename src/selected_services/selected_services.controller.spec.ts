import { Test, TestingModule } from '@nestjs/testing';
import { SelectedServicesController } from './selected_services.controller';
import { SelectedServicesService } from './selected_services.service';

describe('SelectedServicesController', () => {
  let controller: SelectedServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedServicesController],
      providers: [SelectedServicesService],
    }).compile();

    controller = module.get<SelectedServicesController>(SelectedServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
