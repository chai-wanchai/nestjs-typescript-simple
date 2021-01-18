import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


@Injectable()
export class SMTPService {
	transporter: Mail
	constructor(private configService: ConfigService) {
		this.init()
	}
	init() {
		const configSMTP = this.configService.get('smtp')
		const option = {
			host: configSMTP.host,
			port: configSMTP.port,
			auth: {
				user: configSMTP.username,
				pass: configSMTP.password,
			}
		}
		this.transporter = nodemailer.createTransport(option);
	}
	async send(option: Mail.Options) {
		if (!option.from) {
			const sender = this.configService.get('SMTP_SENDER')
			option.from = { address: sender, name: sender }
		}
		try {
			let info = await this.transporter.sendMail(option);
			return info
		} catch (error) {
			throw error
		}

	}
}