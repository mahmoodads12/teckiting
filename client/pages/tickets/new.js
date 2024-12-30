import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const NewTicket = () => {
  const [ticketName, setTicketName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title: ticketName,
      price: ticketPrice,
    },
    onSuccess: () => Router.push('/'),
  });
  const onBlur = () => {
    const value = parseFloat(ticketPrice);

    if (isNaN(value)) {
      return;
    }

    setTicketPrice(value.toFixed(2));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Ticket Name: ${ticketName}, Ticket Price: ${ticketPrice}`);

    doRequest();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Create a New Ticket</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="ticketName" className="form-label">
            Ticket Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ticketName"
            placeholder="Enter ticket name"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ticketPrice" className="form-label">
            Ticket Price
          </label>
          <input
            type="number"
            className="form-control"
            id="ticketPrice"
            placeholder="Enter ticket price"
            value={ticketPrice}
            onBlur={onBlur}
            onChange={(e) => setTicketPrice(e.target.value)}
            required
            min="0" // HTML5-Validierung, um den Preis nicht unter 0 zu setzen
          />
        </div>
        {errors}
        <button type="submit" className="btn btn-primary w-100">
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
