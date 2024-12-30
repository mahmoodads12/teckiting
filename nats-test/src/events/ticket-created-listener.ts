import { TicketCreatedEvent } from './ticket-created-event';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // in this syntax we are sure that can't be other than TicketCreated

  // subject: Subjects.TicketCreated = Subjects.TicketCreated; is the same readonly subject = Subjects.TicketCreated;

  readonly subject = Subjects.TicketCreated;

  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);
    console.log(data.id);
    console.log(data.title);
    console.log(data.price);
    msg.ack();
  }
}
