import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PruductImageService } from './pruduct_image.service';
import { CreatePruductImageDto } from './dto/create-pruduct_image.dto';
import { UpdatePruductImageDto } from './dto/update-pruduct_image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pruduct-image')
export class PruductImageController {
  constructor(private readonly pruductImageService: PruductImageService) {}

  @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createPruductImageDto: CreatePruductImageDto, @UploadedFile() image: any) {
      return this.pruductImageService.create(createPruductImageDto, image);
    }

  @Get()
  findAll() {
    return this.pruductImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pruductImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePruductImageDto: UpdatePruductImageDto) {
    return this.pruductImageService.update(+id, updatePruductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pruductImageService.remove(+id);
  }
}
