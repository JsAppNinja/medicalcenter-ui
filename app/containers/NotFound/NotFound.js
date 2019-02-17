import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Container from 'components/Container';
import NotFoundImage from 'images/donut.png';

import './style.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <Container>
          <div className="notfound-page">
            <div className="notfound-page__image">
              <span className="notfound-page__image-four">4</span>
              <img className="notfound-page__image-src" src={NotFoundImage} alt="404" />
              <span className="notfound-page__image-four">4</span>
            </div>
            <div className="notfound-page__textbutton">
              <div className="notfound-page__text">
                We couldn’t find the page you were looking for, but we found a donut!
              </div>
              <div className="notfound-page__buttons">
                <Link to="/">
                  <Button className="notfound-page__buttons-btn">Go Home</Button>
                </Link>
                <Link to="/contact-us">
                  <Button className="notfound-page__buttons-btn">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default NotFound;
