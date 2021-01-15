import { Controller, Get, Post, UseGuards, Request, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../shared/auth.guard';
import { TokenPayloadDto, UserLoginDto, UserRegisterDto } from '../dto/auth/auth.dto';
import { AuthService } from '../service/auth.service';
import { TokenPayload } from '../decorator/user.decorator';
@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }
	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() body: UserLoginDto) {
		try {
			const user = await this.authService.validateUser(body.username, body.password)
			const token = await this.authService.encodeToken({ ...user })
			return { access_token: token }
		} catch (error) {
			throw error
		}
	}
	@Post('/register')
	async register(@Body() body: UserRegisterDto) {
		try {
			const result = await this.authService.registerUser(body)
			return result
		} catch (error) {
			throw error
		}
	}

	@ApiBearerAuth()
	@UseGuards(JWTAuthGuard)
	@Get('/token-valid')
	async validateToken(@TokenPayload() payload: TokenPayloadDto) {
		return {
			payload: payload
		}
	}
	@Get('/users')
	async getUser(){
		const users = await this.authService.getUsers()
		return users
	}
}