import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-outer" className="row col-12 center-mid">
      <div id="footer-inner" className="row col-10 center-full">
        <div className="col-3">
          <h4>Contact Us</h4>
          <div className="pl-20">
            <div>
              <img src="./images/icon/icons8_facebook_old.ico" alt="fb" />
              <img src="./images/icon/icons8_youtube.ico" alt="yt" />
              <img src="./images/icon/icons8_instagram.ico" alt="ins" />
            </div>
            <p>Phone: 0392017497</p>
            <p>Address: Binh Giang - Hai Duong - Viet Nam</p>
            <p>Email: akanerms@gmail.com</p>
          </div>
        </div>
        <div className="col-3">
          <h4>Help</h4>
          <div className="pl-20">
            <p>How to use</p>
            <p>Sale and Purchase</p>
          </div>
        </div>
        <div className="col-3">
          <h4>Payload</h4>
          <div className="pl-20">
            <img src="./images/icon/icons8_visa.ico" alt="visa" />
            <img src="./images/icon/icons8_mastercard_logo.ico" alt="mascard" />
            <img src="./images/icon/icons8_credit_card.ico" alt="crecard" />
            <br />
            <img src="./images/icon/icons8_paypal.ico" alt="paypal" />
            <img src="./images/icon/icons8_rent.ico" alt="rent" />
            <img src="./images/icon/icons8_bank_cards.ico" alt="bankcard" />
          </div>
        </div>
        <div className="col-3">
          <h4>Download App</h4>
          <div className="pl-20">
            <img className="col-6" src="./images/icon/icons8_qr_code.ico" alt="qr" />
            <img src="./images/icon/icons8_app_symbol.ico" alt="app" />
            <br />
            <img src="./images/icon/icons8_playstore.ico" alt="play" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
