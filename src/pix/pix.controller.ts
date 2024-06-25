import { Controller, Post, Get, Delete, Body, Param, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { PixService } from './pix.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { Pix, SendPix } from './interfaces/pix.interface';
import { SendPixByEmailDto} from './dto/send-pix.dto';
import { Account } from 'src/account/interfaces/account.interface';

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

}
