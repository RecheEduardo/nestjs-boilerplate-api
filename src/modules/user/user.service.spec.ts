import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

describe(UserService, () => {
  let service: UserService;
  let repository: UserRepository;

  const defaultCreateUserDto: User = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'password',
    email: 'johndoe@email.com',
    active: true,
    id: '1',
    salt: 'salt',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      jest.spyOn(repository, 'create').mockReturnValue(defaultCreateUserDto);

      const createdUser = service.create(defaultCreateUserDto);
      expect(createdUser.username).toBe(defaultCreateUserDto.username);
      expect(createdUser.id).toBeDefined();
    });
  });

  describe('update', () => {});

  describe('findAll', () => {});
});
