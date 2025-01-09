import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && {
      dropdown: true, // Dropdown-Menü
      label: 'Account',
      items: [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Sign Out', href: '/auth/signout' },
      ],
    },
  ].filter(Boolean);

  // Link-Liste erstellen
  const linkList = links.map((link) => {
    if (link.dropdown) {
      return (
        <li key={link.label} className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {link.label}
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            {link.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="dropdown-item">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={link.href} className="nav-item">
        <Link
          href={link.href}
          className="nav-link text-dark fw-semibold px-3 py-2"
        >
          {link.label}
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
          MMA
        </Link>

        {/* Burger-Menü */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigations-Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center text-center">
            {linkList}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
