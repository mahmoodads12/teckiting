import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@matickets12/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  console.log('show id: ', req.params.id);
  const ticket = await Ticket.findById(req.params.id);
  console.log('ticket from show: ', ticket);

  if (ticket == null) {
    throw new NotFoundError(); // Exception wird geworfen und vom errorHandler behandelt
  }

  res.status(200).send(ticket); // Dieser Aufruf bleibt korrekt
});

export { router as showTicketRouter };
