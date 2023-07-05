import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PaginationService],
})
export class UserModule {}
