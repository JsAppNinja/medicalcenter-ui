import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import MarkerIcon from 'images/mapMarkerIcon.png';

import { homeSetHoverDoctorRequest } from '../../redux/actions';
import { makeSelectDoctorList, makeSelectHoverDoctorId } from '../../redux/selectors';
import DoctorModal from '../DoctorModal';

import './style.scss';

const mapStyles = [{ featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#c6c6c6' }] }, { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] }, { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] }, { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] }, { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] }, { featureType: 'water', elementType: 'all', stylers: [{ color: '#dde6e8' }, { visibility: 'on' }] }];
const clusterStyles = [
  {
    textColor: 'white',
    url: MarkerIcon,
    height: 36,
    width: 36,
  },
];

const getDoctorDOM = (currentPosition, doctors, filteredIndexes) => {
  const doctorGroupDOM = [];
  // save same positioned doctors.
  const groupItem = doctors.filter((loopDoctor, filterIdx) => {
    if (filteredIndexes.includes(filterIdx)) {
      return null;
    }
    const loopItemLat = parseFloat(loopDoctor.getIn(['doctor', 'latitude']));
    const loopItemLng = parseFloat(loopDoctor.getIn(['doctor', 'longitude']));
    const loopPosition = {
      latitude: loopItemLat,
      longitude: loopItemLng,
    };
    const passedCondition = JSON.stringify(loopPosition) === JSON.stringify(currentPosition);

    if (passedCondition) {
      filteredIndexes.push(filterIdx);
    }

    return (passedCondition);
  });

  groupItem.forEach((doctor) => {
    const doctorDom = (
      <li
        key={doctor.getIn(['doctor', 'uuid'])}
        className="marker-cluster__label-list__item"
        id={doctor.getIn(['doctor', 'uuid'])}
        style={{ backgroundImage: `url('${doctor.getIn(['doctor', 'photo_url'])}?w=40')` }}
      >
        <span className="marker-cluster__label-list__item-price">
          ${doctor.getIn(['doctor', 'lowest_consultation_price'])}
        </span>
      </li>
    );

    doctorGroupDOM.push(doctorDom);
  });

  return doctorGroupDOM;
};

const setModal = (props) => (evt) => {
  let parent = evt.target;
  while (parent !== document.body) {
    if (parent.className === 'marker-cluster__label-list__item') {
      parent.onClick = props.showModal(parent.id);
      break;
    }
    parent = parent.parentNode;
  }
};

const setMarkerStyle = (props) => (evt) => {
  let parent = evt.target;
  while (parent !== document.body) {
    if (parent.className === 'marker-cluster__label-list__item') {
      props.setHoverDoctors(parent.id);
      break;
    }
    parent = parent.parentNode;
  }
};

const unsetMarkerStyle = (props) => (evt) => {
  let parent = evt.target;
  while (parent !== document.body) {
    if (parent.className === 'marker-cluster__label-list__item') {
      props.setHoverDoctors('');
      break;
    }
    parent = parent.parentNode;
  }
};

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBnDIyMfItxgieGHCc1FNLmGVSgG02a5bg&v=3.34&libraries=geometry,drawing,places',
    loadingElement: <div className="loading-element" />,
    containerElement: <div className="container-element" />,
    mapElement: <div className="map-element" />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { doctors } = props;
  const filteredIndexes = [];
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 39.782308, lng: -102.443226 }}
      defaultMapTypeId="roadmap"
      defaultOptions={{ styles: mapStyles, scrollwheel: false }}
      disableDefaultUI
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        gridSize={60}
        maxZoom={16}
        styles={clusterStyles}
        clusterClass="marker-cluster"
        ignoreHidden
      >
        {doctors.map((curItem, index) => {
          let groupDoctorDOM = [];
          const currentItemLat = parseFloat(curItem.getIn(['doctor', 'latitude']));
          const currentItemLng = parseFloat(curItem.getIn(['doctor', 'longitude']));
          if (!filteredIndexes.includes(index)) {
            const currentPosition = {
              latitude: currentItemLat,
              longitude: currentItemLng,
            };

            groupDoctorDOM = getDoctorDOM(currentPosition, doctors, filteredIndexes);
          }

          return (
            <MarkerWithLabel
              key={`marker_${curItem.getIn(['doctor', 'uuid'])}`}
              position={{
                lat: currentItemLat,
                lng: currentItemLng,
              }}
              labelClass="marker-cluster__label"
              icon={{ url: MarkerIcon }}
              onClick={setModal(props)}
              onMouseOver={setMarkerStyle(props)}
              onFocus={setMarkerStyle(props)}
              onMouseOut={unsetMarkerStyle(props)}
              onBlur={unsetMarkerStyle(props)}
              // eslint-disable-next-line
              labelAnchor={new google.maps.Point(65, 40)}
            >
              <ul className="marker-cluster__label-list">
                {groupDoctorDOM}
                <div className="marker-cluster__label-list__triangledown" />
              </ul>
            </MarkerWithLabel>
          );
        })
        }
      </MarkerClusterer>
    </GoogleMap>
  );
});

const PATCH_ONREMOVE = Symbol.for('Patch onRemove');

function waitForGoogleThenPatch() {
  /* global google */
  if (typeof google === 'undefined') {
    window.requestAnimationFrame(waitForGoogleThenPatch);
  } else {
    const { Marker } = google.maps;
    if (Marker[PATCH_ONREMOVE]) return;
    Marker[PATCH_ONREMOVE] = true;
    const patch = (onRemove) => function onRemovePatched(...args) {
      let temp = document.createElement('div');

      if (!this.labelDiv_.parentNode) {
        temp.appendChild(this.labelDiv_);
      }
      if (!this.eventDiv_.parentNode) {
        temp.appendChild(this.eventDiv_);
      }
      if (!this.listeners_) {
        this.listeners_ = [];
      }
      onRemove.call(this, ...args);
      temp = null;
    };

    Marker.prototype.setMap = ((setMap) => function setMapPatched(...args) {
      if (this.label) {
        const proto = Object.getPrototypeOf(this.label);
        if (!proto[PATCH_ONREMOVE]) {
          proto[PATCH_ONREMOVE] = true;
          proto.onRemove = patch(proto.onRemove);
        }
      }

      setMap.call(this, ...args);
    })(Marker.prototype.setMap);
  }
}

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  window.requestAnimationFrame(waitForGoogleThenPatch);
}

class CloudMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      doctorId: '',
      isModalShow: false,
      totalDoctorDoms: [],
    };
  }

  componentDidMount = () => {
    this.setState({ totalDoctorDoms: document.getElementsByClassName('marker-cluster__label-list__item') });
  };

  setHoverDoctorOnOff = (hoverDoctorId) => {
    this.props.setHoveredDoctorId(hoverDoctorId);
  }

  setHoverDoctorItem = (hoverDoctorId) => {
    const { totalDoctorDoms } = this.state;
    for (let i = totalDoctorDoms.length / 2; i < totalDoctorDoms.length; i += 1) {
      if (totalDoctorDoms[i].id === hoverDoctorId) {
        totalDoctorDoms[i].style.color = '#ff6f31';
        totalDoctorDoms[i].style.opacity = '1';
      } else {
        totalDoctorDoms[i].style.color = '#fafafa';
        totalDoctorDoms[i].style.opacity = '0.9';
      }
    }
  }

  showDoctorModal = (doctorId) => {
    this.setState({ doctorId, isModalShow: true });
  }

  hideDoctorModal = () => {
    this.setState({ isModalShow: false });
  }

  launchDoctorModal = (doctors) => {
    let doctorItem = {};
    doctors.get('providers').forEach((item) => {
      const currentDoctorId = item.getIn(['doctor', 'uuid']);
      if (this.state.doctorId === currentDoctorId) {
        doctorItem = item.get('doctor');
      }
    });

    return (
      <DoctorModal doctor={doctorItem} handleClose={this.hideDoctorModal} />
    );
  }

  render() {
    const { doctors, hoverDoctorId } = this.props;
    if (this.state.totalDoctorDoms.length > 0) {
      this.setHoverDoctorItem(hoverDoctorId);
    }
    return (
      <div>
        <MapWithAMarkerClusterer
          doctors={doctors.get('providers')}
          showModal={this.showDoctorModal}
          setHoverDoctors={this.setHoverDoctorOnOff}
        />
        {
          this.state.isModalShow &&
          this.launchDoctorModal(doctors)
        }
      </div>
    );
  }
}

CloudMap.propTypes = {
  doctors: PropTypes.object,
  setHoveredDoctorId: PropTypes.func,
  hoverDoctorId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  doctors: makeSelectDoctorList(),
  hoverDoctorId: makeSelectHoverDoctorId(),
});

const mapDispatchToProps = {
  setHoveredDoctorId: homeSetHoverDoctorRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CloudMap);
