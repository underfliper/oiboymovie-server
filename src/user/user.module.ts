import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, PaginationService],
})
export class UserModule {}
