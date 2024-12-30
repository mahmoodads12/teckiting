import { Publisher, Subjects, TicketUpdatedEvent } from '@matickets12/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
