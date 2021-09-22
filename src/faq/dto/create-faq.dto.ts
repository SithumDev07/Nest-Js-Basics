import { IsString } from 'class-validator';

export class CreateFAQDTO {
    @IsString()
    readonly question: string;
    @IsString()
    readonly answer: string;
}