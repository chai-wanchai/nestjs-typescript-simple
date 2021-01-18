import { Module } from '@nestjs/common';
import { JWTAuthGuard, LocalAuthGuard } from '../shared/auth.guard';
import { AuthController } from '../controller/auth.controller';
import { UsersModule } from './user.module';
import { AuthService } from '../service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { SMTPService } from '../service/mail.service';

@Module({
	imports: [UsersModule,PassportModule],
	controllers: [AuthController],
	providers: [JWTAuthGuard,LocalAuthGuard,AuthService,SMTPService],
	exports:[AuthService,JWTAuthGuard,LocalAuthGuard,SMTPService]
})
export class AuthModule { }
