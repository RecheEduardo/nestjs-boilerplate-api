import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';

describe(UserRepository, () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  beforeAll(() => {});

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {});

  describe('findAll', () => {});

  describe('findOne', () => {});

  describe('update', () => {});

  describe('remove', () => {});
});
