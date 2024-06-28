import React from 'react';
import logo from "../assets/images/colorLogo.png"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector(s=>s.user)
  return (
    <div className=''>
      <header id="navigation" className="navigation">
        <div className="navigation__bar row">
          <div className="col-4 d-flex gap-5 align-items-center">
            <button className="navigation-toggle" aria-label="Open navigation" aria-controls="navigation">
              <span className="navigation-toggle__icon"></span>
              <span className="navigation-toggle__icon navigation-toggle__icon--secondary"></span>
            </button>
            <nav className="navigation-links" aria-label="Main navigation">
              <div className="navigation-links__main">
                <Link to={'/renters'} className="navigation-links__main-link navigation-link" href="/renter">
                  Renters
                </Link>
                <Link to={'/landlords'} className="navigation-links__main-link navigation-link" href="/operators">
                  Landlords
                </Link>
                <a className="link link--decorated-when-active navigation-links__secondary-link" href="/brokers">
                  <span className="link__content">Brokers</span>
                </a>
                <a className="link link--decorated-when-active navigation-links__secondary-link" href="/faq-for-renters">
                  <span className="link__content">FAQ</span>
                </a>
                <a className="link link--decorated-when-active navigation-links__secondary-link" href="/blog">
                  <span className="link__content">The Welcome Mat</span>
                </a>
              </div>
              <div className="navigation-links__bottom">
                <a className="button" target='_blank' href={'/register'}>
                  <span className="button__content">Get Started</span>
                </a>
                <a className="button button--secondary" target="_blank" href="https://login.theguarantors.com/">
                  <span className="button__content">Sign In</span>
                </a>
              </div>
            </nav>
          </div>
          <div className="col-4">
            <Link to={'/'} className="d-md-flex justify-content-center" title="Home" href="/">
              <img src={logo} alt="" className='header__logo' />
            </Link>
          </div>
          <div className="col-4 d-flex gap-5 align-items-center justify-content-end">
            <Link to={'/listings'} className="navigation__secondary-cta navigation-link">
              Listings
            </Link>
           {!user.isLogggedIn && <a target='_blank' href={'/login'} className="navigation__secondary-cta navigation-link">
              Sign In
            </a>}
            {!user.isLogggedIn ? 
            <a target='_blank' href={'/register'} className="button navigation-button" title="Get Started">
              <span className="button__content">
                <svg
                  className="navigation-button__icon"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.88889L11 5.88889M11 5.88889L6.2 11M11 5.88889L6.2 1"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                Get Started
              </span>
            </a>
            :
            user.data.isLandlord ?
            <a target='_blank' href={'/dashboard'} className="button navigation-button" title="Get Started">
              <span className="button__content">
                Dashboard
              </span>
            </a> : 
            <a target='_blank' href={'/saved-properties'} className="button navigation-button" title="Get Started">
            <span className="button__content">
              Saved Properties
            </span>
          </a>
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
