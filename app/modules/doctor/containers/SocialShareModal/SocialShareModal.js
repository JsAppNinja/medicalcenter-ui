import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DoctorPreview from 'components/DoctorPreview';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  makeSelectSocialModalShow,
  makeSelectShareVideoIndex,
} from '../../redux/selectors';
import { toggleSocialModal } from '../../redux/actions';
import './style.scss';

// @TODO handle social sharing with real website links
class SocialShareModal extends Component {
  static initialState = {
    showEmbed: false,
    embedCopied: false,
    linkCopied: false,
  }

  constructor() {
    super();
    this.state = {
      ...SocialShareModal.initialState,
    };
  }

  getEmbedCode() {
    return '<div class="-embed-frame" data-id="12351" data-view="home" style="width:450px;height:300px;margin:auto"></rooms/12351?s=51" rel="nofollow">Sydney City &amp; Harbour at the door</a><script async="" src="https://www.airbnb.com.sg/embeddable/airbnb_jssdk"></script></div>';
  }

  getURL = () => {
    const { doctor, videoIndex } = this.props;
    const v = videoIndex === undefined ? '' : `?video=${videoIndex}`;
    return `https://kangaroomd.com/doctor/${doctor.get('uuid')}${v}`;
  }

  getMsg = () => {
    const { doctor } = this.props;
    return `Check out this outstanding physician on KangarooMD: ${doctor.get('name')}, ${doctor.get('title')}, ${doctor.get('experience') || 10} years of experience.`;
  }

  handleHide = () => {
    this.setState({
      ...SocialShareModal.initialState,
    });
    this.props.toggleSocialModal(false);
  }

  handleShowEmbed = () => {
    this.setState({ showEmbed: true });
  }

  handleLinkCopy = () => {
    this.setState({ linkCopied: true });
  }

  handleEmbedCopy = () => {
    this.setState({ embedCopied: true });
  }

  openTwitter = (e) => {
    const url = encodeURIComponent(this.getURL());

    window.open(`https://twitter.com/share?url=${url}&text=${encodeURIComponent(this.getMsg())}`);
    e.preventDefault();
    e.stopPropagation();
  }

  mailToLink = () => {
    const subject = encodeURIComponent('Checkout this physician profile');
    const body = encodeURIComponent(`Hi,\n\n${this.getMsg()}\n\n ${this.getURL()}`);

    return `mailto:?subject=${subject}&body=${body}`;
  }

  renderList() {
    return (
      <div className="social-share-modal__list">
        <div className="social-share-modal__item">
          {this.getMsg()}
        </div>
        {/* <div className="social-share-modal__item">
          <i className="fa fa-facebook-square social-share-modal__item-icon" />
          <a className="social-share-modal__item-link">Facebook</a>
        </div> */}
        <div className="social-share-modal__item">
          <i className="fa fa-twitter social-share-modal__item-icon" />
          <a className="social-share-modal__item-link" onClick={this.openTwitter}>Twitter</a>
        </div>
        <div className="social-share-modal__item">
          <i className="fa fa-envelope social-share-modal__item-icon" />
          <a className="social-share-modal__item-link" href={this.mailToLink()}>Email</a>
        </div>
        <div className="social-share-modal__item">
          <i className="fa fa-clone social-share-modal__item-icon" />
          <CopyToClipboard onCopy={this.handleLinkCopy} text={this.getURL()}>
            <a className="social-share-modal__item-link">
              {this.state.linkCopied ? 'Link Copied' : 'Copy Link'}
            </a>
          </CopyToClipboard>
        </div>
        {/* <div className="social-share-modal__item">
          <i className="fa fa-code social-share-modal__item-icon" />
          <a className="social-share-modal__item-link" onClick={this.handleShowEmbed}>Embed</a>
        </div> */}
      </div>
    );
  }

  renderEmbed() {
    const { doctor } = this.props;
    const { embedCopied } = this.state;

    return (
      <div className="social-share-modal__embed">
        <Row>
          <Col sm={6}>
            <div className="social-share-modal__embed-desc">
              Copy and paste the following HTML into your website code:
            </div>
            <div className="social-share-modal__embed-text">
              <FormControl
                componentClass="textarea"
                placeholder="textarea"
                rows={4}
                value={this.getEmbedCode()}
                onChange={() => undefined} // intentionally added noop
              />
            </div>
            <CopyToClipboard text={this.getEmbedCode()}>
              <Button bsStyle="primary">{embedCopied ? 'HTML Copied' : 'Copy HTML'}</Button>
            </CopyToClipboard>
          </Col>
          <Col sm={6}>
            <DoctorPreview
              name={doctor.get('name')}
              title={doctor.get('title')}
              photo={`${doctor.get('photo_url')}?w=150`}
              lowestPrice={doctor.get('lowest_consultation_price')}
              experience={doctor.get('experience')}
              rating={doctor.get('rating')}
              uuid={doctor.get('uuid')}
              reviewCount={doctor.get('review_list').size}
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { showEmbed } = this.state;

    return (
      <Modal
        show={this.props.show}
        onHide={this.handleHide}
        dialogClassName="social-share-modal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="social-share-modal">
            {showEmbed ? 'Embed this Physician' : 'Share'}
          </Modal.Title>
          <Modal.Body>
            {showEmbed ? this.renderEmbed() : this.renderList()}
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  show: makeSelectSocialModalShow(),
  videoIndex: makeSelectShareVideoIndex(),
});

const mapDispatchToProps = {
  toggleSocialModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SocialShareModal);
