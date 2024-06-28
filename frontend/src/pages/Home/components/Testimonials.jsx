import React from 'react';
// import RatingStar from "../../../components/common/RatingStar";
import './testimonials.scss';
import RatingStar from '../../../Components/Common/RatingStar';

function Testimonials() {
  return (
    <>
      {/* <section className="testimonials">
      <div className="testimonials__content">
        <div className="testimonials__main" aria-live="polite">
          <div className="testimonials__items">
            <div className="testimonials__item is-active">
              <article id="7wx7blT8Bz16DqsLCBwxgf-0" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                  <meta itemprop="name" content="Rent and Deposit Coverage" />
                </div>
                <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                  <span className="testimonials-item__score">5</span>
                  <RatingStar />
                  <RatingStar />
                  <RatingStar />
                  <RatingStar />
                  <RatingStar />
                </div>
                <figure className="testimonials-item__quote-wrapper">
                  <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                    Thanks to Casper, I was able to fully grasp my freedom, which allowed me to work and travel as much as I needed
                  </blockquote>
                  <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                    <div className="testimonials-item__author" itemprop="name">
                      Susan Doe
                    </div>
                    <div className="testimonials-item__author-detail">Freelancer</div>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="testimonials__item">
              <article id="7wx7blT8Bz16DqsLCBwxgf-1" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                  <meta itemprop="name" content="Rent and Deposit Coverage" />
                </div>
                <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                  <span className="testimonials-item__score">5</span>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <figure className="testimonials-item__quote-wrapper">
                  <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                    TheGuarantors has become the choice for any operator looking to improve financial and operational performance while
                    bringing great value to renters.
                  </blockquote>
                  <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                    <div className="testimonials-item__author" itemprop="name">
                      Chad Cooley
                    </div>
                    <div className="testimonials-item__author-detail">Managing Director, Bozzuto</div>
                    <div className="testimonials-item__logo-wrapper">
                      <img
                        alt=""
                        sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        200w"
                        srcset="
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=384&amp;q=70   384w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=640&amp;q=70   640w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=750&amp;q=70   750w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=828&amp;q=70   828w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=1080&amp;q=70 1080w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=1200&amp;q=70 1200w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=1920&amp;q=70 1920w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=2048&amp;q=70 2048w,
                              https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=3840&amp;q=70 3840w
                            "
                        src="https://images.ctfassets.net/4rh3om84a7gw/6DIqlxaGm9tqYAYASnGAi5/d3f674d26174f03f55888de6685e2f06/Bozzuto-Logo.png?fm=webp&amp;w=3840&amp;q=70"
                        width="200"
                        height="37"
                        decoding="async"
                        data-nimg="future"
                        className="testimonials-item__logo"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="testimonials__item">
              <article id="7wx7blT8Bz16DqsLCBwxgf-2" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                  <meta itemprop="name" content="Rent and Deposit Coverage" />
                </div>
                <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                  <span className="testimonials-item__score">5</span>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <figure className="testimonials-item__quote-wrapper">
                  <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                    Without TheGuarantors, I wouldn't have been able to secure a place to live. I'm from Brazil, didn't have a credit score,
                    and there was no one I could ask to be my guarantor. TheGuarantors made it possible.
                  </blockquote>
                  <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                    <div className="testimonials-item__author" itemprop="name">
                      Fernando V.
                    </div>
                    <div className="testimonials-item__author-detail">Renter</div>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="testimonials__item">
              <article id="7wx7blT8Bz16DqsLCBwxgf-3" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                  <meta itemprop="name" content="Rent and Deposit Coverage" />
                </div>
                <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                  <span className="testimonials-item__score">5</span>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <figure className="testimonials-item__quote-wrapper">
                  <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                    Because of TheGuarantors' products and exceptional service, we have been able to continually improve student conversions
                    while exceeding leasing velocity goals and reducing bad debt.
                  </blockquote>
                  <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                    <div className="testimonials-item__author" itemprop="name">
                      Jonathan Jeans
                    </div>
                    <div className="testimonials-item__author-detail">VP of Operations, B.HOM Student Living</div>
                    <div className="testimonials-item__logo-wrapper">
                      <img
                        alt=""
                        sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        160w"
                        srcset="
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=384&amp;q=70   384w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=640&amp;q=70   640w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=750&amp;q=70   750w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=828&amp;q=70   828w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=1080&amp;q=70 1080w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=1200&amp;q=70 1200w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=1920&amp;q=70 1920w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=2048&amp;q=70 2048w,
                              https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=3840&amp;q=70 3840w
                            "
                        src="https://images.ctfassets.net/4rh3om84a7gw/1mR0qhChMjv70lWkfyeyRy/33124c10af72f73b953630dbb0674bee/BHOM-Logo.png?fm=webp&amp;w=3840&amp;q=70"
                        width="160"
                        height="36"
                        decoding="async"
                        data-nimg="future"
                        className="testimonials-item__logo"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="testimonials__item">
              <article id="7wx7blT8Bz16DqsLCBwxgf-4" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                  <meta itemprop="name" content="Rent and Deposit Coverage" />
                </div>
                <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                  <span className="testimonials-item__score">5</span>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg
                    className="testimonials-item__icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5152 5.28193L10.0185 4.59758L8.00833 0.330127C7.95343 0.213287 7.8631 0.118702 7.75153 0.0612089C7.4717 -0.0834504 7.13166 0.037099 6.99174 0.330127L4.9816 4.59758L0.484887 5.28193C0.360913 5.30047 0.247566 5.36167 0.160784 5.45441C0.0558699 5.56733 -0.00194268 5.71924 4.9848e-05 5.87678C0.00204238 6.03431 0.063677 6.18457 0.17141 6.29454L3.42484 9.61614L2.6562 14.3064C2.63818 14.4155 2.64971 14.5278 2.68948 14.6304C2.72926 14.733 2.79569 14.8218 2.88125 14.8869C2.9668 14.952 3.06805 14.9906 3.17353 14.9985C3.279 15.0064 3.38446 14.9831 3.47797 14.9314L7.50004 12.717L11.5221 14.9314C11.6319 14.9926 11.7594 15.013 11.8816 14.9908C12.1898 14.9352 12.397 14.6291 12.3439 14.3064L11.5752 9.61614L14.8287 6.29454C14.9172 6.20367 14.9757 6.08497 14.9934 5.95515C15.0412 5.63059 14.8251 5.33015 14.5152 5.28193V5.28193Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <figure className="testimonials-item__quote-wrapper">
                  <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                    TheGuarantors is the best solution to help international students find their dream home.
                  </blockquote>
                  <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                    <div className="testimonials-item__author" itemprop="name">
                      Sunanne Zhu
                    </div>
                    <div className="testimonials-item__author-detail">Broker</div>
                    <div className="testimonials-item__logo-wrapper">
                      <img
                        alt=""
                        sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        200w"
                        srcset="
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=384&amp;q=70   384w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=640&amp;q=70   640w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=750&amp;q=70   750w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=828&amp;q=70   828w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=1080&amp;q=70 1080w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=1200&amp;q=70 1200w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=1920&amp;q=70 1920w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=2048&amp;q=70 2048w,
                              https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=3840&amp;q=70 3840w
                            "
                        src="https://images.ctfassets.net/4rh3om84a7gw/lEDOFcaVB4xIeXaMjxKgT/1d2f81dd0b61c55cd8aa8d5faefbf575/AAREB-Logo_2x.png?fm=webp&amp;w=3840&amp;q=70"
                        width="200"
                        height="42"
                        decoding="async"
                        data-nimg="future"
                        className="testimonials-item__logo"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </figcaption>
                </figure>
              </article>
            </div>
          </div>
          <div className="testimonials__actions testimonials-actions">
            <button
              className="testimonials-actions__button"
              aria-expanded="true"
              aria-controls="7wx7blT8Bz16DqsLCBwxgf-0"
              aria-label="Show review by Rikki V., Renter"
            >
              1
            </button>
            <div className="testimonials-actions__timer"></div>
            <button
              className="testimonials-actions__button"
              aria-expanded="false"
              aria-controls="7wx7blT8Bz16DqsLCBwxgf-1"
              aria-label="Show review by Chad Cooley, Managing Director, Bozzuto"
            >
              2
            </button>
            <div className="testimonials-actions__timer"></div>
            <button
              className="testimonials-actions__button"
              aria-expanded="false"
              aria-controls="7wx7blT8Bz16DqsLCBwxgf-2"
              aria-label="Show review by Fernando V., Renter"
            >
              3
            </button>
            <div className="testimonials-actions__timer"></div>
            <button
              className="testimonials-actions__button"
              aria-expanded="false"
              aria-controls="7wx7blT8Bz16DqsLCBwxgf-3"
              aria-label="Show review by Jonathan Jeans, VP of Operations, B.HOM Student Living"
            >
              4
            </button>
            <div className="testimonials-actions__timer"></div>
            <button
              className="testimonials-actions__button"
              aria-expanded="false"
              aria-controls="7wx7blT8Bz16DqsLCBwxgf-4"
              aria-label="Show review by Sunanne Zhu, Broker"
            >
              5
            </button>
            <div className="testimonials-actions__timer"></div>
          </div>
        </div>
        <div className="testimonials__image-wrapper">
          <img
            alt=""
            sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        1400w"
            srcset="
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=384&amp;q=70   384w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=640&amp;q=70   640w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=750&amp;q=70   750w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=828&amp;q=70   828w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=1080&amp;q=70 1080w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=1200&amp;q=70 1200w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=1920&amp;q=70 1920w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=2048&amp;q=70 2048w,
                  https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=3840&amp;q=70 3840w
                "
            src="https://images.ctfassets.net/4rh3om84a7gw/6wEMZIFmOt28W702oQZ7xh/41d225c72c6244138326919a12686051/homepage-testimonials-image.jpg?fm=webp&amp;w=3840&amp;q=70"
            width="1400"
            height="1400"
            decoding="async"
            data-nimg="future"
            className="testimonials__image"
            loading="lazy"
            style={{ color: 'transparent' }}
          />
          <img
            alt=""
            sizes="
        (min-resolution: 2.1dppx) and (max-width: 768px) 50vw,
        1400w"
            srcset="
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=384&amp;q=70   384w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=640&amp;q=70   640w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=750&amp;q=70   750w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=828&amp;q=70   828w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=1080&amp;q=70 1080w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=1200&amp;q=70 1200w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=1920&amp;q=70 1920w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=2048&amp;q=70 2048w,
                  https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=3840&amp;q=70 3840w
                "
            src="https://images.ctfassets.net/4rh3om84a7gw/62ycTiYzO3kr6MMkcKnRFu/8000b3f201fb79181f0c706b076e8a77/homepage-testimonials-frame.png?fm=webp&amp;w=3840&amp;q=70"
            width="1400"
            height="1400"
            decoding="async"
            data-nimg="future"
            className="testimonials__frame-image"
            loading="lazy"
            style={{ color: 'transparent' }}
          />
        </div>
      </div>
    </section> */}
      <section
        class="u-clearfix u-container-align-center-lg u-container-align-center-md u-container-align-center-xl u-palette-3-base u-section-1"
        id="sec-f403"
      >
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-11">
              <img
                class="custom-expanded u-image u-image-default u-image-1 animated customAnimationIn-played"
                src="https://assets.nicepagecdn.com/11a8ddce/6158865/images/close-up-mature-lawyer-holding-law-book-looking-away-courtroomcopy.jpg"
                alt=""
                data-animation-duration="2000"
                style={{
                  willChange: 'transform, opacity',
                  animationDuration: '2000ms'
                }}
              />
              <div
                class="u-border-2 u-border-black u-border-no-left u-border-no-right u-border-no-top u-container-style u-group u-white u-group-1 animated customAnimationIn-played"
                data-animation-name="customAnimationIn"
                data-animation-duration="2000"
                style={{
                  willChange: 'transform, opacity',
                  animationDuration: '2000ms'
                }}
              >
                <div class="u-container-layout u-valign-middle u-container-layout-1">
                  {/* <h3 class="u-text u-text-default u-text-1">
                    {" "}
                    “My top priority is to earn your trust and keep it."
                  </h3>
                  <h6 class="u-text u-text-default u-text-2">
                    Nick Parson, founder
                  </h6>
                  <p class="u-custom-font u-font-ubuntu u-text u-text-default u-text-3">
                    Image from{" "}
                    <a
                      href="https://freepik.com"
                      class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1"
                    >
                      Freepik
                    </a>
                  </p> */}
                  <div className="testimonials__item is-active">
                    <article id="7wx7blT8Bz16DqsLCBwxgf-0" className="testimonials-item" itemscope="" itemtype="https://schema.org/Review">
                      <div itemprop="itemReviewed" itemscope="" itemtype="https://schema.org/Thing">
                        <meta itemprop="name" content="Rent and Deposit Coverage" />
                      </div>
                      <div className="testimonials-item__score-wrapper" itemprop="reviewRating" itemtype="https://schema.org/Rating">
                        <span className="testimonials-item__score">5</span>
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                      </div>
                      <figure className="testimonials-item__quote-wrapper">
                        <blockquote className="testimonials-item__quote" itemprop="reviewBody">
                          Thanks to Casper, I was able to fully grasp my freedom, which allowed me to work and travel as much as I needed
                        </blockquote>
                        <figcaption itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                          <div className="testimonials-item__author" itemprop="name">
                            Susan Doe
                          </div>
                          <div className="testimonials-item__author-detail">Freelancer</div>
                        </figcaption>
                      </figure>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
