import { Test, TestingModule } from '@nestjs/testing';
import { AppJwtController } from './app-jwt.controller';

describe('AppJwtController', () => {
  let controller: AppJwtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppJwtController],
    }).compile();

    controller = module.get<AppJwtController>(AppJwtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
