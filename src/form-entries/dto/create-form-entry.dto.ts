import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFormEntryDto {
    @IsString()
    @IsNotEmpty()
    sno: string;

    @IsString()
    @IsNotEmpty()
    make_no: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    kw: number;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    model_no: string;

    @IsString()
    @IsNotEmpty()
    equipment: string;
}

