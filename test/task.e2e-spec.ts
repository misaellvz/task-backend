import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TaskService } from 'src/task/task.service';
import * as request from 'supertest';

describe('DocumentFileResolver (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
    server.close();
  });

  describe('Mutation #createTask', () => {
    const description = 'Task One';
    const mutation = () => `
      mutation {
        createTask(input: {
          description: "${description}"
        }) {
          description
          isCompleted
        }
      }
    `;

    it('create task in database', async () => {
      const service = app.get<TaskService>(TaskService);
      jest.spyOn(service, 'create');

      const { body } = await request(server)
        .post('/graphql')
        .send({ query: mutation() });

      expect(body).toEqual({
        data: {
          createTask: {
            description,
            isCompleted: false,
          },
        },
      });

      const createDto = {
        description,
      };

      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });
});
