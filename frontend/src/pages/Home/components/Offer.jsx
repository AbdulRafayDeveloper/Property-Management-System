import React from 'react';

function Offer() {
  return (
    <section className="offer">
      <div className="offer__content">
        <div className="offer__image-wrapper">
          <picture>
            <source
              srcset="
                    https://images.ctfassets.net/4rh3om84a7gw/30JTjwVBqfWilm1JWw5PRj/2c5f682d1570798b97c076462bc849c9/homepage-offer-image-desktop.jpg?fm=webp&amp;q=70
                  "
              media="(min-width: 1280px)"
            />
            <source
              srcset="
                    https://images.ctfassets.net/4rh3om84a7gw/30JTjwVBqfWilm1JWw5PRj/2c5f682d1570798b97c076462bc849c9/homepage-offer-image-desktop.jpg?fm=webp&amp;w=2048&amp;q=70
                  "
              media="(min-width: 768px)"
            />
            <img
              className="offer__image"
              src="https://images.ctfassets.net/4rh3om84a7gw/6Uqhp2UZ4wWdMJKNjxaJSo/0fddbb048a4bac73095fa28502750e21/homepage-offer-image.jpg?fm=webp&amp;w=1024&amp;q=70"
              width="1500"
              height="1336"
              alt=""
              loading="lazy"
            />
          </picture>
        </div>
        <div className="offer__main offer__main--simple">
          <ul className="offer__list">
            <li className="offer__item offer__item--simple">
              <article className="offer-item">
                <div className="offer-item__icon-wrapper">
                  <img
                    alt=""
                    sizes="
                        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
                        60w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/1FuC6KRUoiolDLWVhSPhwT/59daf323391038b124eb434f144b2a5f/carousel-roperty-managers-icon-01.svg"
                    width="60"
                    height="60"
                    className="offer-item__icon"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="offer-item__image-wrapper">
                  <img
                    alt=""
                    sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        728w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/7kyynaMg6STDcFwfXIxJds/977f95bf90778db59f3544f8a0cdb71c/Image_-_The_apartment_has_been_re-rented__1_.png?fm=webp&amp;w=3840&amp;q=70"
                    width="728"
                    height="600"
                    className="offer-item__image"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <h2 className="offer-item__heading">Verified Renters</h2>
                <p className="offer-item__description">
                  Discover peace of mind with verified renters on Casper. Our screening process ensures reliability. Say goodbye to leasing
                  uncertainty.
                </p>
              </article>
            </li>
            <li className="offer__item offer__item--simple">
              <article className="offer-item">
                <div className="offer-item__icon-wrapper">
                  <img
                    alt=""
                    sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        60w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/6JS152pR4AZ60d8qZgGmZn/da79d62840b53f4501565d03169f0221/carousel-roperty-managers-icon-02.svg"
                    width="60"
                    height="60"
                    className="offer-item__icon"
                    loading="eager"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="offer-item__image-wrapper">
                  <img
                    alt=""
                    sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        348w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/2kXkgnnWbcbMs6KnYfZpnu/91eca6c7449db360bfc7f1216d73d99c/homepage-offer-item-image-02.jpg?fm=webp&amp;w=3840&amp;q=70"
                    width="348"
                    height="232"
                    className="offer-item__image"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <h2 className="offer-item__heading">Break Free</h2>
                <p className="offer-item__description">
                  Subletting made simple with Casper. Streamline the process and find replacements quickly and hassle-free.
                </p>
              </article>
            </li>
            <li className="offer__item offer__item--simple">
              <article className="offer-item">
                <div className="offer-item__icon-wrapper">
                  <img
                    alt=""
                    sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        120w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/46k0JIOJfbkDq0yi3zyWv0/0c0b223cf40d75f8f9a4f7b62c1fa599/Untitled_Frame__1_.png?fm=webp&amp;w=3840&amp;q=70"
                    width="120"
                    height="120"
                    className="offer-item__icon"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="offer-item__image-wrapper">
                  <img
                    alt=""
                    sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        348w"
                    src="https://images.ctfassets.net/4rh3om84a7gw/3bSwuWcYd4b9KeSJPQUa7s/4c58ccf945979788dbb78465d01c3172/homepage-offer-item-image-03.jpg?fm=webp&amp;w=3840&amp;q=70"
                    width="348"
                    height="232"
                    className="offer-item__image"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <h2 className="offer-item__heading">Manage</h2>
                <p className="offer-item__description">
                  Manage listings effortlessly on our management app. From posting to maintenance, we simplify rental management. Choose
                  convenience.
                </p>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Offer;
