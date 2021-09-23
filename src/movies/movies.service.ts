import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        // parseInt(id) same as +id
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie With id:${id} not found`);
        }

        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        let id: number;
        if (this.movies.length === 0) {
            id = this.movies.length + 1;
        } else {
            id = this.movies.find((_, index) => index == this.movies.length - 1).id + 1
        }
        this.movies.push({
            id: id,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
