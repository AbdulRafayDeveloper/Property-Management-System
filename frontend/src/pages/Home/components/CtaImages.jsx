import React from 'react';

function CtaImages() {
  return (
    <section className="image-with-cta">
      <div className="image-with-cta__content">
        <picture>
          <source
            srcset="
                  https://images.ctfassets.net/4rh3om84a7gw/4MKisqChdlY4Lx9D6awSPu/74b351394f4d34445a3bb3300ebe04ae/image-with-cta-01-desktop.jpg?fm=webp&amp;q=70
                "
            media="(min-width: 1280px)"
          />
          <source
            srcset="
                  https://images.ctfassets.net/4rh3om84a7gw/4MKisqChdlY4Lx9D6awSPu/74b351394f4d34445a3bb3300ebe04ae/image-with-cta-01-desktop.jpg?fm=webp&amp;w=2048&amp;q=70
                "
            media="(min-width: 1024px)"
          />
          <source
            srcset="
                  https://images.ctfassets.net/4rh3om84a7gw/4i0H2NZZ8GFD8yK9jFqcVY/b4b1ef65ae27e72ee26d53fbefa85ec2/image-with-cta-01.jpg?fm=webp&amp;w=2048&amp;q=70
                "
            media="(min-width: 768px)"
          />
          <img
            className="image-with-cta__image"
            src="https://images.ctfassets.net/4rh3om84a7gw/4i0H2NZZ8GFD8yK9jFqcVY/b4b1ef65ae27e72ee26d53fbefa85ec2/image-with-cta-01.jpg?fm=webp&amp;w=1024&amp;q=70"
            width="2048"
            height="4096"
            alt=""
            loading="lazy"
          />
        </picture>
        <div className="image-with-cta__main">
          <h2 className="image-with-cta__heading">Step into new possibilities</h2>
          <a className="button" href="/get-started">
            <span className="button__content">Get Started</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CtaImages;
