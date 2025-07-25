import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(@Args('createHistoryDto') createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Query(() => [History], { name: 'getAllHistory' })
  findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History, { name: 'getHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.historyService.findOne(id);
  }

  @Mutation(() => History)
  updateHistory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateHistoryDto') updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Mutation(() => Boolean)
  async removeHistory(@Args('id', { type: () => Int }) id: number) {
    await this.historyService.remove(id);
    return true;
  }
}
