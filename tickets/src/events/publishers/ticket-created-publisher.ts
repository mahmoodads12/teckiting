import { Publisher, Subjects, TicketCreatedEvent } from '@matickets12/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
