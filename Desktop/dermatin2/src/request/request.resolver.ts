import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestService } from './request.service';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Mutation(() => Request)
  createRequest(@Args('createRequestDto') createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll() {
    return this.requestService.findAll();
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requestService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(@Args('updateRequestDto') updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(updateRequestDto.id, updateRequestDto);
  }

  @Mutation(() => Boolean)
  removeRequest(@Args('id', { type: () => Int }) id: number) {
    return this.requestService.remove(id).then(() => true);
  }
}
