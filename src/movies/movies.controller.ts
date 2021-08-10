import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.movieService.getAll();
    }

    @Get('search')
    search(@Query('year') searchinYear: string) {
        return `We are searching a movie after title: ${searchinYear}`;
    }

    @Get('/:id')
    getOne(@Param("id") id: number): Movie {
        return this.movieService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        // console.log(movieData);

        return this.movieService.create(movieData);
    }

    @Delete("/:id")
    delete(@Param("id") movieId: number) {
        return this.movieService.deleteOne(movieId);
    }

    //If we use put it will update the whole movie
    @Patch('/:id')
    update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.movieService.update(movieId, updateData);
    }



}
