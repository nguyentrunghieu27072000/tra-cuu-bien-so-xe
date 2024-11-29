import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchProvinceCodeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  keyword: string;
}
