import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

    async createNotification(userId: string, message: string): Promise<Notification> {
        this.logger.log(`Creating notification for user ID: ${userId}`);
        const newNotification = new this.notificationModel({ userId, message });
        return await newNotification.save();
    }

    async getNotifications(userId: string): Promise<Notification[]> {
        this.logger.log(`Getting notifications for user ID: ${userId}`);
        return await this.notificationModel.find({ userId }).exec();
    }

    async markAsRead(notificationId: string): Promise<Notification> {
        this.logger.log(`Marking notification as read: ${notificationId}`);
        return await this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
    }
}
