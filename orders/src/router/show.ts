import { requireAuth } from '@matickets12/common';
import express, { Request, RequestHandler, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, (async (
  req: Request,
  res: Response
) => {
  console.log('Fetching order with ID:', req.params.orderId);
  const orders = await Order.findById(req.params.orderId).populate('ticket');

  if (!orders) {
    console.log('Order not found');
    return res.status(404).send({ error: 'Order not found' });
  }
  if (orders.userId !== req.currentUser!.id) {
    console.log(
      'Unauthorized access attempt by user:',
      req.currentUser!.id,
      'for order owned by:',
      orders.userId
    );
    return res.status(401).send({ error: 'Not authorized' });
  }

  res.send(orders);
}) as RequestHandler);

export { router as showOrderRouter };
