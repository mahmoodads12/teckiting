import { Subjects, Publisher, PaymentCreatedEvent } from '@matickets12/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
