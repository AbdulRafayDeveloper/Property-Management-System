import React from 'react';
import logo from "../assets/images/footerLogo.png"

function Footer() {
  return (
    <div className='landing__pages'>
      <footer className="landing__footer">
        <div className="footer__content-wrapper">
          <div className="footer__content">
            <div className="footer__wordmark-wrapper">
              <a className="footer__wordmark-link is-active" title="Home" href="/">
                <img src={logo} alt="" style={{width:'50%'}} />
              </a>
            </div>
            <div className="footer-main-content">
              <div className="footer-main-content__cta-wrapper">
                <button className='btn fs-3 btn-outline-light'>Sigin in</button>
              </div>
              <div className="footer-main-content__links-wrapper">
                <nav className="footer-main-content__links footer-main-content__links--primary">
                  <h2 className="footer-main-content__links-heading">Explore</h2>
                  <a className="link footer-main-content__link" href="/renter">
                    <span className="link__content">Renters</span>
                  </a>
                  <a className="link footer-main-content__link" href="/operators">
                    <span className="link__content">Landlords</span>
                  </a>
                  <a className="link footer-main-content__link" href="/brokers">
                    <span className="link__content">Listings</span>
                  </a>
                  <a className="link footer-main-content__link" href="/faq-for-renters">
                    <span className="link__content">FAQ</span>
                  </a>
                </nav>
                <nav className="footer-main-content__links">
                  <h2 className="footer-main-content__links-heading">Company</h2>
                  <a className="link footer-main-content__link" href="/contact-us">
                    <span className="link__content">Contact Us</span>
                  </a>
                  <a className="link footer-main-content__link" href="/about">
                    <span className="link__content">About</span>
                  </a>
                </nav>
                {/* <nav className="footer-main-content__social-media-links" aria-label="Social media links">
                  <a
                    className="footer-main-content__social-media-link"
                    href="https://www.linkedin.com/company/the-guarantors"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="footer-main-content__social-media-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 2.50382C1 2.10498 1.15844 1.72248 1.44046 1.44046C1.72248 1.15844 2.10498 1 2.50382 1H17.4945C17.6922 0.999679 17.888 1.03834 18.0707 1.11378C18.2533 1.18922 18.4194 1.29996 18.5592 1.43964C18.699 1.57933 18.81 1.74522 18.8856 1.92783C18.9612 2.11044 19.0001 2.30617 19 2.50382V17.4945C19.0002 17.6922 18.9614 17.888 18.8859 18.0707C18.8104 18.2534 18.6996 18.4194 18.5598 18.5593C18.4201 18.6991 18.2541 18.81 18.0715 18.8856C17.8888 18.9612 17.6931 19.0001 17.4954 19H2.50382C2.30627 19 2.11065 18.9611 1.92814 18.8855C1.74564 18.8098 1.57982 18.699 1.44017 18.5593C1.30052 18.4195 1.18976 18.2536 1.11424 18.0711C1.03871 17.8886 0.999893 17.6929 1 17.4954V2.50382ZM8.12473 7.86291H10.5621V9.08691C10.9139 8.38327 11.8139 7.75 13.1664 7.75C15.7592 7.75 16.3736 9.15155 16.3736 11.7231V16.4865H13.7497V12.3089C13.7497 10.8444 13.3979 10.018 12.5045 10.018C11.2649 10.018 10.7495 10.909 10.7495 12.3089V16.4865H8.12473V7.86291ZM3.62473 16.3745H6.24945V7.75H3.62473V16.3736V16.3745ZM6.625 4.93709C6.62995 5.16182 6.58996 5.38528 6.50738 5.59435C6.4248 5.80342 6.30129 5.99388 6.1441 6.15457C5.98691 6.31526 5.79921 6.44293 5.59201 6.5301C5.38481 6.61726 5.16229 6.66216 4.9375 6.66216C4.71271 6.66216 4.49019 6.61726 4.28299 6.5301C4.07579 6.44293 3.88809 6.31526 3.7309 6.15457C3.57371 5.99388 3.4502 5.80342 3.36762 5.59435C3.28504 5.38528 3.24505 5.16182 3.25 4.93709C3.25971 4.49597 3.44177 4.07619 3.75718 3.76765C4.07259 3.45911 4.49627 3.28634 4.9375 3.28634C5.37873 3.28634 5.80241 3.45911 6.11782 3.76765C6.43323 4.07619 6.61529 4.49597 6.625 4.93709V4.93709Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="footer-main-content__social-media-link"
                    href="https://twitter.com/The_Guarantors"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="footer-main-content__social-media-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 4.73572C18.3381 5.02904 17.627 5.22722 16.8794 5.3168C17.6508 4.85526 18.2278 4.12885 18.503 3.27311C17.7783 3.70356 16.9851 4.00656 16.158 4.16891C15.6018 3.57504 14.8651 3.18141 14.0623 3.04914C13.2594 2.91687 12.4354 3.05336 11.7181 3.43741C11.0007 3.82146 10.4303 4.4316 10.0953 5.17308C9.76022 5.91457 9.67936 6.74592 9.86523 7.53807C8.39683 7.46434 6.96033 7.08267 5.64898 6.41785C4.33762 5.75302 3.18071 4.81988 2.25333 3.679C1.93623 4.22599 1.7539 4.86018 1.7539 5.5356C1.75354 6.14363 1.90328 6.74235 2.18981 7.27863C2.47634 7.81491 2.89082 8.27218 3.39646 8.60985C2.81005 8.59119 2.23658 8.43274 1.72377 8.14768V8.19525C1.72371 9.04803 2.0187 9.87458 2.55868 10.5346C3.09865 11.1947 3.85036 11.6476 4.68625 11.8165C4.14226 11.9637 3.57192 11.9854 3.01832 11.8799C3.25416 12.6137 3.71355 13.2553 4.33219 13.7151C4.95082 14.1748 5.69772 14.4295 6.46833 14.4436C5.16018 15.4706 3.54461 16.0276 1.88153 16.0252C1.58693 16.0252 1.29258 16.008 1 15.9736C2.68813 17.059 4.65322 17.6351 6.66018 17.6328C13.454 17.6328 17.168 12.006 17.168 7.12584C17.168 6.96729 17.164 6.80716 17.1569 6.64861C17.8793 6.12617 18.5029 5.47923 18.9984 4.7381L19 4.73572V4.73572Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="footer-main-content__social-media-link"
                    href="https://www.facebook.com/TheGuarantors"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="footer-main-content__social-media-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 10.0503C1 14.5248 4.24975 18.2455 8.5 19V12.4998H6.25V10H8.5V7.99975C8.5 5.74975 9.94975 4.50025 12.0002 4.50025C12.6497 4.50025 13.3503 4.6 13.9998 4.69975V7H12.85C11.7498 7 11.5 7.54975 11.5 8.25025V10H13.9L13.5002 12.4998H11.5V19C15.7502 18.2455 19 14.5255 19 10.0503C19 5.0725 14.95 1 10 1C5.05 1 1 5.0725 1 10.0503Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="footer-main-content__social-media-link"
                    href="https://www.instagram.com/theguarantors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="footer-main-content__social-media-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.9122 6.31279C18.9021 5.557 18.7606 4.80874 18.4941 4.10145C18.2629 3.50486 17.9098 2.96305 17.4574 2.51064C17.005 2.05823 16.4632 1.70516 15.8666 1.474C15.1684 1.21191 14.4308 1.07019 13.6852 1.05488C12.7252 1.01197 12.4209 1 9.98403 1C7.54718 1 7.23484 1 6.28185 1.05488C5.53658 1.07031 4.79933 1.21202 4.10145 1.474C3.50477 1.705 2.96288 2.05801 2.51044 2.51044C2.05801 2.96288 1.705 3.50477 1.474 4.10145C1.21138 4.79911 1.06998 5.53653 1.05588 6.28185C1.01297 7.24282 1 7.54718 1 9.98404C1 12.4209 1 12.7322 1.05588 13.6862C1.07085 14.4326 1.21155 15.1691 1.474 15.8686C1.70539 16.4651 2.05866 17.0068 2.51125 17.459C2.96383 17.9113 3.50577 18.2641 4.10245 18.4951C4.79841 18.7677 5.5358 18.9196 6.28285 18.9441C7.24382 18.987 7.54818 19 9.98503 19C12.4219 19 12.7342 19 13.6872 18.9441C14.4328 18.9294 15.1704 18.7881 15.8686 18.526C16.465 18.2946 17.0067 17.9414 17.4591 17.489C17.9115 17.0367 18.2646 16.495 18.4961 15.8985C18.7585 15.2 18.8992 14.4636 18.9142 13.7162C18.9571 12.7562 18.9701 12.4518 18.9701 10.014C18.9681 7.57712 18.9681 7.26777 18.9122 6.31279V6.31279ZM9.97805 14.5923C7.42943 14.5923 5.36479 12.5277 5.36479 9.97905C5.36479 7.43043 7.42943 5.36578 9.97805 5.36578C11.2016 5.36578 12.375 5.85182 13.2401 6.71698C14.1053 7.58213 14.5913 8.75553 14.5913 9.97905C14.5913 11.2026 14.1053 12.376 13.2401 13.2411C12.375 14.1063 11.2016 14.5923 9.97805 14.5923V14.5923ZM14.7749 6.27087C14.6336 6.271 14.4937 6.24327 14.3631 6.18926C14.2325 6.13524 14.1139 6.05601 14.014 5.95609C13.9141 5.85618 13.8348 5.73754 13.7808 5.60696C13.7268 5.47639 13.6991 5.33645 13.6992 5.19514C13.6992 5.05394 13.727 4.91412 13.781 4.78367C13.8351 4.65322 13.9143 4.53469 14.0141 4.43484C14.114 4.335 14.2325 4.2558 14.3629 4.20176C14.4934 4.14773 14.6332 4.11991 14.7744 4.11991C14.9156 4.11991 15.0554 4.14773 15.1859 4.20176C15.3163 4.2558 15.4349 4.335 15.5347 4.43484C15.6346 4.53469 15.7138 4.65322 15.7678 4.78367C15.8218 4.91412 15.8497 5.05394 15.8497 5.19514C15.8497 5.78989 15.3687 6.27087 14.7749 6.27087Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M9.97714 12.9763C11.6322 12.9763 12.9738 11.6346 12.9738 9.97958C12.9738 8.32457 11.6322 6.98291 9.97714 6.98291C8.32213 6.98291 6.98047 8.32457 6.98047 9.97958C6.98047 11.6346 8.32213 12.9763 9.97714 12.9763Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="footer-main-content__social-media-link"
                    href="https://www.theguarantors.com/wechat"
                    aria-label="WeChat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="footer-main-content__social-media-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1725_3495)">
                        <path
                          d="M13.7525 6.00976C14.1326 6.00976 14.503 6.039 14.8636 6.08773C14.2008 3.19299 11.1599 1 7.50489 1C3.36258 1 0 3.80702 0 7.26707C0 9.26513 1.12086 11.0293 2.8655 12.1794L1.8811 14.1579L4.57116 12.9981C5.14621 13.2028 5.7505 13.3685 6.39378 13.4562C6.30606 13.0761 6.25732 12.6862 6.25732 12.2768C6.24758 8.82653 9.61016 6.00976 13.7525 6.00976V6.00976ZM10 3.81677C10.1229 3.81677 10.2446 3.84097 10.3581 3.88799C10.4716 3.93502 10.5748 4.00394 10.6616 4.09082C10.7485 4.17771 10.8175 4.28086 10.8645 4.39438C10.9115 4.5079 10.9357 4.62957 10.9357 4.75245C10.9357 4.87532 10.9115 4.99699 10.8645 5.11051C10.8175 5.22403 10.7485 5.32718 10.6616 5.41407C10.5748 5.50095 10.4716 5.56987 10.3581 5.6169C10.2446 5.66392 10.1229 5.68812 10 5.68812C9.75187 5.68812 9.51387 5.58954 9.3384 5.41407C9.16293 5.23859 9.06435 5.0006 9.06435 4.75245C9.06435 4.50429 9.16293 4.2663 9.3384 4.09082C9.51387 3.91535 9.75187 3.81677 10 3.81677V3.81677ZM5.00001 5.69787C4.75186 5.69787 4.51386 5.59929 4.33839 5.42381C4.16292 5.24834 4.06434 5.01035 4.06434 4.76219C4.06434 4.51404 4.16292 4.27604 4.33839 4.10057C4.51386 3.9251 4.75186 3.82652 5.00001 3.82652C5.24817 3.82652 5.48616 3.9251 5.66163 4.10057C5.83711 4.27604 5.93569 4.51404 5.93569 4.76219C5.93569 5.01035 5.83711 5.24834 5.66163 5.42381C5.48616 5.59929 5.24817 5.69787 5.00001 5.69787V5.69787Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M20.001 12.2768C20.001 9.50881 17.2037 7.26709 13.7534 7.26709C10.3031 7.26709 7.50586 9.50881 7.50586 12.2768C7.50586 15.0449 10.3031 17.2866 13.7534 17.2866C14.3187 17.2866 14.8646 17.2086 15.3811 17.0917L18.7534 18.5439L17.5839 16.2047C19.0458 15.2886 20.001 13.885 20.001 12.2768ZM11.8723 11.965C11.6873 11.965 11.5064 11.9101 11.3525 11.8073C11.1986 11.7045 11.0787 11.5583 11.0079 11.3873C10.9371 11.2164 10.9185 11.0282 10.9546 10.8467C10.9907 10.6652 11.0799 10.4985 11.2107 10.3677C11.3416 10.2368 11.5083 10.1477 11.6898 10.1116C11.8713 10.0755 12.0594 10.094 12.2304 10.1648C12.4014 10.2356 12.5475 10.3556 12.6503 10.5094C12.7531 10.6633 12.808 10.8442 12.808 11.0293C12.8178 11.5459 12.3889 11.965 11.8723 11.965ZM15.6248 11.965C15.3766 11.965 15.1386 11.8664 14.9632 11.6909C14.7877 11.5154 14.6891 11.2774 14.6891 11.0293C14.6891 10.7811 14.7877 10.5431 14.9632 10.3677C15.1386 10.1922 15.3766 10.0936 15.6248 10.0936C15.8729 10.0936 16.1109 10.1922 16.2864 10.3677C16.4619 10.5431 16.5605 10.7811 16.5605 11.0293C16.5605 11.2774 16.4619 11.5154 16.2864 11.6909C16.1109 11.8664 15.8729 11.965 15.6248 11.965V11.965Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_1725_3495">
                          <rect width="20" height="20" fill="currentColor"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__content-wrapper">
          <div className="footer__content">
            <div className="footer-secondary-content">
              <div className="footer-secondary-content__disclaimer">
                <div className="footer-secondary-content__legal">
                  <p className="footer-secondary-content__paragraph">
                    Capser is a licensed insurance agent and broker.
                    {/* For more detailed information, please see our&nbsp;
                    <a className="link link--decorated footer-secondary-content__paragraph-link" href="/legal-regulatory">
                      <span className="link__content">Legal / Regulatory Notice</span>
                    </a>
                    . */}
                  </p>
                </div>
              </div>
              <div className="footer-secondary-content__bottom">
                <small className="footer-secondary-content__copyright">© 2024 Casper</small>
                <nav className="footer-secondary-content__links" aria-label="Links to legal documents">
                  <a className="link footer-secondary-content__link" href="/notice-of-collection">
                    <span className="link__content">Notice of Collection</span>
                  </a>
                  <a className="link footer-secondary-content__link" href="/legal-regulatory">
                    <span className="link__content">Legal / Regulatory Notice</span>
                  </a>
                  <a className="link footer-secondary-content__link" href="/terms">
                    <span className="link__content">Terms of Service</span>
                  </a>
                  <a className="link footer-secondary-content__link" href="/privacy">
                    <span className="link__content">Privacy Policy</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
