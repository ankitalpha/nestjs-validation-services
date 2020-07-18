import { IsNotEmpty } from 'class-validator';

export class UserValidationDto {
    @IsNotEmpty()
    source_type: string;

    @IsNotEmpty()
    source_id: number;

    valid_upto : number

}
