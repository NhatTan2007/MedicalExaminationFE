export interface Notification{
    message: string
    status: NotificationStatus
}

export enum NotificationStatus{
    Failed,
    Success
}