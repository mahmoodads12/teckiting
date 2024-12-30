import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validationRequest,
} from '@matickets12/common';
import express, { Request, RequestHandler, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60; // 1 Minute

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.body;

      // Versuche, das Ticket zu finden
      const ticket = await Ticket.findById(ticketId);

      if (!ticket) {
        throw new NotFoundError(); // Ticket nicht gefunden
      }

      // Überprüfe, ob das Ticket reserviert ist
      const isReserved = await ticket.isReserved();
      if (isReserved) {
        throw new BadRequestError('User is already reserved this ticket');
      }

      // Ablaufdatum für die Bestellung berechnen
      const expiration = new Date();
      expiration.setSeconds(
        expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
      );

      // Bestellung erstellen und speichern
      const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
      });
      await order.save();

      // Ereignis veröffentlichen
      new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
        version: order.version,
      });

      // Erfolgreiche Antwort zurückgeben
      res.status(201).send(order);
    } catch (error) {
      // Fehlerbehandlung
      console.error('Error processing the order:', error);

      // Sende spezifische Fehler als Antwort
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        throw error; // Fehler weitergeben (wird vom Error-Handler abgefangen)
      }

      // Allgemeiner Serverfehler
      res
        .status(500)
        .send({ error: 'Something went wrong. Please try again.' });
    }
  }
) as RequestHandler;

export { router as newOrderRouter };
