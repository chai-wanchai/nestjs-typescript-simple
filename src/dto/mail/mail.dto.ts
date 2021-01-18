import { ApiProperty } from '@nestjs/swagger';
export class SendMailDto {
	@ApiProperty()
	to: string
	@ApiProperty()
	message?: string
	@ApiProperty()
	title?: string 
}