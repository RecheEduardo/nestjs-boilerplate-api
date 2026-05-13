import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const DefaultUser: CreateUserDto = {
    username: 'john',
    password: 'Test1234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /User', async () => {
    const createdUser = await request(
      app.getHttpServer() as Parameters<typeof request>[0],
    )
      .post('/users')
      .send(DefaultUser);

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuidRegex.test(createdUser.body.id)).toBe(true);

    return request(app.getHttpServer() as Parameters<typeof request>[0])
      .get('/users')
      .expect(200)
      .then((response: request.Response) => {
        expect((response.body as unknown[]).length).toBe(1);
      });
  });
});
