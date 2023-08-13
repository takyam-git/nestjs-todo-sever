import { IsNotEmpty, IsString, Length, NotContains } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  @NotContains('\n')
  @NotContains('\r')
  title: string;

  @IsString()
  @Length(0, 100000)
  body: string;
}
