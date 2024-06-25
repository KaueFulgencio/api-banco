import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './interfaces/notification.interface';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body('email') email: string, @Body('message') message: string): Promise<Notification> {
    return this.notificationService.createNotification(email, message);
  }

  @Get(':email')
  async getNotifications(@Param('email') email: string): Promise<Notification[]> {
    return this.notificationService.getNotifications(email);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }
}
