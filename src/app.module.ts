import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [MoviesModule, FaqModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
