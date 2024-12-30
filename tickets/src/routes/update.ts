import express, { Request, RequestHandler, Response } from 'express';
import { body } from 'express-validator';

import {
  validationRequest,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  BadRequestError,
} from '@matickets12/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { Stan } from 'node-nats-streaming';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price mus be provided and must be grater than 0'),
  ],
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    console.error('update Id: ', req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (ticket.orderId) {
      throw new BadRequestError('Cannot edit a reserved ticket');
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.send(ticket);
  }
) as RequestHandler;

export { router as updateTicketRouter };
