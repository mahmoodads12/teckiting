import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  // console.log('Client Side!');
  // console.log(currentUser);
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// hier is the Server Side; it will used for Example to fetch Data During SSR (Server Side Rendering)!
// this is the only way to fetch Data during SSR
// why did you use axios and not use-request ? -> because Hooks are used in Components and hier in server side is not component

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const res = await client.get('/api/tickets');

  return { tickets: res.data };
};

export default LandingPage;
