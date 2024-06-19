import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { PixService } from './pix.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { Pix, SendPix } from './interfaces/pix.interface';
import { SendPixDto } from './dto/send-pix.dto';

@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post(':email')
  async createPixKey(
    @Param('email') email: string,
    @Body() createPixDto: CreatePixDto,
  ): Promise<Pix> {
    return this.pixService.createPixKey(email, createPixDto);
  }

  @Get(':email')
  async listPixKeys(@Param('email') email: string): Promise<Pix[]> {
    return this.pixService.listPixKeys(email);
  }

  @Delete(':email/:pixId')
  async deletePixKey(
    @Param('email') email: string,
    @Param('pixId') pixId: string,
  ): Promise<void> {
    return this.pixService.deletePixKey(email, pixId);
  }
  /*
  @Post('send')
  async sendPix(@Body() sendPixDto: SendPixDto): Promise<SendPix> {
    return this.pixService.sendPix(sendPixDto);
  }*/
}
