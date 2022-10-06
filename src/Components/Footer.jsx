import React from "react";
import chevron from "../images/chevron.svg";
export default function Footer() {
  return (
    <footer class="block block--black footer">
      <div class="container grid">
        <section class="footer__brand">
          <img class="footer__logo" src="/images/logo.svg" alt="" />
          <p class="footer__copyright">Copyright © 2022 parsa pico</p>
        </section>
        <section class="collapsible footer__section">
          <header class="collapsible__header">
            <h2 class="collapsible__heading">products</h2>
            <img class="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div class="collapsible__content">
            <ul class="list list--hover">
              <li class="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li class="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li class="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li class="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li class="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section class="collapsible footer__section">
          <header class="collapsible__header">
            <h2 class="collapsible__heading">company</h2>
            <img class="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div class="collapsible__content">
            <ul class="list list--hover">
              <li class="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li class="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li class="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li class="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li class="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section class="collapsible footer__section">
          <header class="collapsible__header">
            <h2 class="collapsible__heading">support</h2>
            <img class="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div class="collapsible__content">
            <ul class="list list--hover">
              <li class="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li class="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li class="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li class="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li class="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
        <section class="collapsible footer__section">
          <header class="collapsible__header">
            <h2 class="collapsible__heading">domains</h2>
            <img class="icon collapsible__chevron" src={chevron} alt="" />
          </header>
          <div class="collapsible__content">
            <ul class="list list--hover">
              <li class="footer__item">
                <a href="#">WordPress Hosting</a>
              </li>
              <li class="footer__item">
                <a href="#">Free Automated WordPress</a>
              </li>
              <li class="footer__item">
                <a href="#">Migrations</a>
              </li>
              <li class="footer__item">
                <a href="#">Domain Names</a>
              </li>
              <li class="footer__item">
                <a href="#">Monthly Web Hosting</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
}
