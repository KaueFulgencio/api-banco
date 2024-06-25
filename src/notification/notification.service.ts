import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

    async createNotification(email: string, message: string): Promise<Notification> {
        const notification = new this.notificationModel({
          email, 
          message,
          createdAt: new Date(),
        });
    
        return await notification.save();
      }

    async getNotifications(email: string): Promise<Notification[]> {
        this.logger.log(`Getting notifications for user ID: ${email}`);
        return await this.notificationModel.find({ email }).exec();
    }

    async markAsRead(notificationId: string): Promise<Notification> {
        this.logger.log(`Marking notification as read: ${notificationId}`);
        return await this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
    }
}
