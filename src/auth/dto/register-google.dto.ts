import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterGoogleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsString()
  readonly avatar: string
}