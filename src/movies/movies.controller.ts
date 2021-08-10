import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will retun all movies";
    }

    @Get('/:id')
    getOne(@Param("id") id: string) {
        return `Movie with ${id}`;
    }

    @Post()
    create() {
        return 'THis will create movie';
    }

    @Delete("/:id")
    delete(@Param("id") movieId: string) {
        return `Movie Deleted ${movieId}`;
    }

    //If we use put it will update the whole movie
    @Patch('/:id')
    update(@Param('id') movieId: string) {
        return `Patched ${movieId}`;
    }
}
