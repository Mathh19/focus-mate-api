import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginGoogleDto {
  @IsString()
  readonly avatar: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}