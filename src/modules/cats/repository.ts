import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CatsEntity } from '@/core/cats/entity/cats';
import { ICatsRepository } from '@/core/cats/repository/cats';
import { CreatedModel } from '@/infra/repository';
import { PostgresRepository } from '@/infra/repository/postgres/repository';
import { SearchTypeEnum } from '@/utils/decorators/types';
import { ValidateDatabaseSortAllowed } from '@/utils/decorators/validate-database-sort-allowed.decorator';
import { ValidateTypeOrmFilter } from '@/utils/decorators/validate-typeorm-filter.decorator';
import { calucaleSkip } from '@/utils/pagination';

import { CatsSchema } from './schema';
import { CatsListInput, CatsListOutput } from './types';

@Injectable()
export class CatsRepository extends PostgresRepository<CatsSchema & CatsEntity> implements Partial<ICatsRepository> {
  constructor(readonly repository: Repository<CatsSchema & CatsEntity>) {
    super(repository);
  }

  @Transactional()
  async executeWithTransaction(input: CatsSchema & CatsEntity): Promise<CreatedModel> {
    // use if you want transaction, you can use other repositories here, exemple
    // this.dogReposipoty.create(input);
    const created = await super.create(input);
    return created;
  }

  @ValidateTypeOrmFilter([
    { name: 'name', type: SearchTypeEnum.like },
    { name: 'breed', type: SearchTypeEnum.like },
    { name: 'age', type: SearchTypeEnum.equal }
  ])
  @ValidateDatabaseSortAllowed(['createdAt', 'name', 'breed', 'age'])
  async paginate(input: CatsListInput): Promise<CatsListOutput> {
    const skip = calucaleSkip(input);

    const [docs, total] = await this.repository.findAndCount({
      take: input.limit,
      skip,
      order: input.sort,
      where: input.search
    });

    return { docs, total, page: input.page, limit: input.limit };
  }
}
