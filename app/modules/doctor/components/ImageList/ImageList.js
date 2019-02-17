import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';
import Gallery from 'react-image-gallery';
import LoadableList from 'components/LoadableList';
import './style.scss';

class ImageList extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      startIndex: 0,
    };
  }

  handleShow = (startIndex) => {
    this.setState({
      show: true,
      startIndex,
    });
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  render() {
    const { images, limit, imgClassName } = this.props;
    const galleryImages = images.map((img) => ({
      original: `${img.src}?max-w=900&max-h=600&fit=crop`,
      originalTitle: img.title,
      thumbnail: `${img.src}?max-w=150&max-h=150&fit=crop`,
    }));

    return (
      <div className="image-list">
        <LoadableList
          className="row"
          limit={limit}
          btnText="Load More Images"
          items={images}
          btnClassName="col-sm-12"
        >
          {(item, index) => (
            <div key={`image_${index}`} className={cx('image-list__item', imgClassName)}>
              <div className="image-list__item-title">
                {item.title}
              </div>
              <div
                className="image-list__item-img"
                onClick={() => this.handleShow(index)}
                style={{ backgroundImage: `url('${item.src}')` }}
              />
            </div>
          )}
        </LoadableList>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="photo-viewer"
        >
          <Gallery
            items={galleryImages}
            startIndex={this.state.startIndex}
            showGalleryPlayButton={false}
          />
        </Modal>
      </div>
    );
  }
}

ImageList.propTypes = {
  images: PropTypes.array,
  limit: PropTypes.number,
  imgClassName: PropTypes.string,
};

export default ImageList;
