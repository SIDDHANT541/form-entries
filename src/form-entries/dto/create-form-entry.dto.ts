import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFormEntryDto {
    @IsString()
    @IsNotEmpty()
    sno: string;

    @IsString()
    @IsNotEmpty()
    make_no: string;

    @IsNumber()
    @IsNotEmpty()
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

