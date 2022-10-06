import React from "react";
import chevron from "../images/chevron.svg";
export default function Footer() {
  return (
    <footer className="block block--black footer">
      <div className="container grid">
        <section className="footer__brand">
          <img className="footer__logo" src="" alt="" />
          <p className="footer__copyright">Copyright © 2022 parsa pico</p>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading">products</h2>
            <img className="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div className="collapsible__content">
            <ul className="list list--hover">
              <li className="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li className="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li className="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li className="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li className="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading">company</h2>
            <img className="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div className="collapsible__content">
            <ul className="list list--hover">
              <li className="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li className="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li className="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li className="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li className="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading">support</h2>
            <img className="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div className="collapsible__content">
            <ul className="list list--hover">
              <li className="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li className="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li className="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li className="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li className="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="collapsible footer__section">
          <header className="collapsible__header">
            <h2 className="collapsible__heading">domains</h2>
            <img className="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div className="collapsible__content">
            <ul className="list list--hover">
              <li className="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li className="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li className="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li className="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li className="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
}
