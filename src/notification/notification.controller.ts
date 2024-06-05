import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './interfaces/notification.interface';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    async createNotification(@Body('userId') userId: string, @Body('message') message: string): Promise<Notification> {
        return this.notificationService.createNotification(userId, message);
    }

    @Get(':userId')
    async getNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getNotifications(userId);
    }

    @Post(':id/read')
    async markAsRead(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.markAsRead(id);
    }
}
