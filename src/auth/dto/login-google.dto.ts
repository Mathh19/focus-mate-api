import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginGoogleDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}