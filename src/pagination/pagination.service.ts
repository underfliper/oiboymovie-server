import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto';

@Injectable()
export class PaginationService {
  getPagination(dto: PaginationDto, defaultPage = 1, defaultPerPage = 15) {
    const page = dto.page ? dto.page : defaultPage;
    const perPage = dto.perPage ? dto.perPage : defaultPerPage;

    const skip = (page - 1) * perPage;

    return { perPage, skip };
  }
}
