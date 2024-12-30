import { Publisher, OrderCancelledEvent, Subjects } from '@matickets12/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
