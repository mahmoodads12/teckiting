import { Publisher, OrderCreatedEvent, Subjects } from '@matickets12/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
