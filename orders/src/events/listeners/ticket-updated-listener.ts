import { Ticket } from '../../models/ticket';
import { Listener, TicketUpdatedEvent, Subjects } from '@matickets12/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './ticket-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    console.log('Ticket data before:', await Ticket.find({}));
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price, version } = data;
    ticket.set({ title, price, version });
    await ticket.save();
    console.log('Ticket data after:', await Ticket.find({}));

    msg.ack();
  }
}
