import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@matickets12/common';
import { indexOrderRouter } from './router';
import { newOrderRouter } from './router/new';
import { showOrderRouter } from './router/show';
import { deleteOrderRouter } from './router/delete';
import 'express-async-errors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production', // Nur bei HTTPS aktivieren
    sameSite: 'none', // Wichtig für Cross-Origin-Cookies
  })
);

app.use(currentUser);

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
