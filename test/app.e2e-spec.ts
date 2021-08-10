import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie API');
  });

  describe('/movies', () => {
    // it('GET', () => {
    //   return request(app.getHttpServer())
    //     .get('/movies')
    //     .expect(200)
    // })

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: "Tenet",
          year: 2015,
          genres: ['Thriller, Scientific']
        })
        .expect(201);
    })
  })


  // it('/movies (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/movies')
  //     .expect(200)
  //     .expect([]);
  // })

  describe('/movies/:id', () => {
    // it.todo('GET')
    // it.todo('DELETE')
    // it.todo('PATCH')

    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    })
  })
});
