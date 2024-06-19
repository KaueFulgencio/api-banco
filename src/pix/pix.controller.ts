import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { PixService } from './pix.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { Pix, SendPix } from './interfaces/pix.interface';
import { SendPixDto } from './dto/send-pix.dto';

@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post(':accountId')
  async createPixKey(
    @Param('accountId') accountId: string,
    @Body() createPixDto: CreatePixDto,
  ): Promise<Pix> {
    return this.pixService.createPixKey(accountId, createPixDto);
  }

  @Get(':accountId')
  async listPixKeys(@Param('accountId') accountId: string): Promise<Pix[]> {
    return this.pixService.listPixKeys(accountId);
  }

  @Delete(':accountId/:pixId')
  async deletePixKey(
    @Param('accountId') accountId: string,
    @Param('pixId') pixId: string,
  ): Promise<void> {
    return this.pixService.deletePixKey(accountId, pixId);
  }

  @Post('send')
  async sendPix(@Body() sendPixDto: SendPixDto): Promise<SendPix> {
    return this.pixService.sendPix(sendPixDto);
  }
}
