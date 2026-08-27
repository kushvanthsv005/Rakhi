import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Home",
      id: "home",
    },
    {
      label: "Memories",
      id: "memories",
    },
    {
      label: "Our Journey",
      id: "journey",
    },
    {
      label: "Letter",
      id: "letter",
    },
    {
      label: "Blessings",
      id: "blessings",
    },
    {
      label: "Finale",
      id: "finale",
    },
  ];

  const scrollToSection = (id) => {
    const section =
      document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <nav className="rakhi-navbar">
      <button
        className="navbar-logo"
        onClick={() =>
          scrollToSection("home")
        }
      >
        <span>✦</span>
        Rakhi
      </button>

      {/* Desktop navigation */}
      <div className="navbar-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              scrollToSection(item.id)
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        className="navbar-menu-button"
        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span
          className={
            menuOpen
              ? "menu-line open"
              : "menu-line"
          }
        />

        <span
          className={
            menuOpen
              ? "menu-line open"
              : "menu-line"
          }
        />

        <span
          className={
            menuOpen
              ? "menu-line open"
              : "menu-line"
          }
        />
      </button>

      {/* Mobile navigation */}
      <div
        className={
          menuOpen
            ? "mobile-nav open"
            : "mobile-nav"
        }
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              scrollToSection(item.id)
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;