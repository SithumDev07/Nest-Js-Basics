import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2455,
        genres: ['test']
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('Should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie With id:999 not found")
      }
    })

  });

  describe('deletOne', () => {
    it("deletes a movie", () => {
      service.create({
        title: 'Test Movie',
        year: 2455,
        genres: ['test']
      });

      // const AllMovies = service.getAll();
      const AllMovies = service.getAll().length;
      service.deleteOne(1);
      // const afterDelete = service.getAll();
      const afterDelete = service.getAll().length;

      // expect(afterDelete.length).toEqual(AllMovies.length - 1);
      expect(afterDelete).toBeLessThan(AllMovies);
    })

    it('Should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })

  })

  describe("Create()", () => {
    it("Should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2455,
        genres: ['test']
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe("Update()", () => {
    it("should update a movie", () => {
      service.create({
        title: 'Test Movie',
        year: 2455,
        genres: ['test']
      });
      service.update(1, { title: 'Updated Test' });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    })

    it('Should return a 404', () => {
      try {
        service.update(999, { title: 'Updated Test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

});
