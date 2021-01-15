import { Module } from '@nestjs/common';
import { UsersService } from '../service/user.service';
@Module({
  imports: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}