import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe(UserService, () => {
  let service: UserService;
  let repository: UserRepository;

  const defaultCreateUserDto: User[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: 'password',
      email: 'johndoe@email.com',
      active: true,
      id: '1',
      salt: 'salt',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'password',
      email: 'janedoe@email.com',
      active: true,
      id: '2',
      salt: 'salt',
    },
  ];

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
    it('Should be successful', () => {
      jest.spyOn(repository, 'create').mockReturnValue(defaultCreateUserDto[0]);

      const createdUser = service.create(defaultCreateUserDto[0]);
      expect(createdUser.username).toBe(defaultCreateUserDto[0].username);
      expect(createdUser.id).toBeDefined();
    });

    it('Should fail', () => {
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const user = () => service.create(defaultCreateUserDto[0]);
      expect(user).toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('Should be successful', () => {
      jest.spyOn(repository, 'update').mockReturnValue(defaultCreateUserDto[0]);

      const updatedUser = service.update('1', defaultCreateUserDto[0]);
      expect(updatedUser.username).toBe(defaultCreateUserDto[0].username);
      expect(updatedUser.id).toBeDefined();
    });

    it('Should fail', () => {
      jest.spyOn(repository, 'update').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const user = () => service.update('1', defaultCreateUserDto[0]);
      expect(user).toThrow(BadRequestException);
    });
  });

  describe('find', () => {
    it('Should be successful', () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(defaultCreateUserDto[0]);
      const foundUser = service.findOne('1');
      expect(foundUser.username).toBe(defaultCreateUserDto[0].username);
      expect(foundUser.id).toBeDefined();
    });

    it('Should fail', () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const user = () => service.findOne('1');
      expect(user).toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('Should be successful', () => {
      jest.spyOn(repository, 'create').mockReturnValue(defaultCreateUserDto[0]);
      const createdUser1 = service.create(defaultCreateUserDto[0]);
      expect(createdUser1.username).toBe(defaultCreateUserDto[0].username);
      expect(createdUser1.id).toBeDefined();

      jest.spyOn(repository, 'create').mockReturnValue(defaultCreateUserDto[1]);
      const createdUser2 = service.create(defaultCreateUserDto[1]);
      expect(createdUser2.username).toBe(defaultCreateUserDto[1].username);
      expect(createdUser2.id).toBeDefined();

      jest.spyOn(repository, 'findAll').mockReturnValue(defaultCreateUserDto);
      const foundUsers = service.findAll();
      expect(foundUsers.length).toBe(2);
    });

    it('Should fail', () => {
      jest.spyOn(repository, 'findAll').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const users = () => service.findAll();
      expect(users).toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('Should be successful', () => {
      jest.spyOn(repository, 'create').mockReturnValue(defaultCreateUserDto[0]);
      const createdUser = service.create(defaultCreateUserDto[0]);
      expect(createdUser.username).toBe(defaultCreateUserDto[0].username);
      expect(createdUser.id).toBeDefined();

      jest.spyOn(repository, 'remove').mockReturnValue(undefined);
      const deletedUser = service.remove(createdUser.id);
      expect(deletedUser).toBeUndefined();
    });

    it('Should fail', () => {
      jest.spyOn(repository, 'remove').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const user = () => service.remove('1');
      expect(user).toThrow(BadRequestException);
    });
  });
});
