import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries', description: 'The todo text/title' })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateTodoDto {
  @ApiProperty({ example: 'Buy groceries', description: 'The todo text/title', required: false })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({ example: false, description: 'Whether the todo is completed', required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
