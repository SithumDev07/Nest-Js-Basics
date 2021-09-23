import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly photoURI: string;

    @IsString()
    readonly duration: string;

    @IsString()
    readonly released: string;

    @IsNumber()
    readonly rating: number;

    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];

    @IsString()
    readonly backgroundImageURI: string;
}