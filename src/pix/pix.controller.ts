import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PixService } from './pix.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { Pix} from './interfaces/pix.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post(':email')
  @UseGuards(AuthGuard('jwt'))
  async createPixKey(
    @Param('email') email: string,
    @Body() createPixDto: CreatePixDto,
  ): Promise<Pix> {
    return this.pixService.createPixKey(email, createPixDto);
  }

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  async listPixKeys(@Param('email') email: string): Promise<Pix[]> {
    return this.pixService.listPixKeys(email);
  }

  @Delete(':email/:pixId')
  @UseGuards(AuthGuard('jwt'))
  async deletePixKey(
    @Param('email') email: string,
    @Param('pixId') pixId: string,
  ): Promise<void> {
    return this.pixService.deletePixKey(email, pixId);
  }

}
