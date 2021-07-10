import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsController } from './credit-cards.controller';

describe('CreditCardsController', () => {
  let controller: CreditCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardsController],
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
