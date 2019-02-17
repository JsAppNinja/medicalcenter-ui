import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const ApiKey =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBnDIyMfItxgieGHCc1FNLmGVSgG02a5bg&v=3.31&libraries=geometry,drawing,places';
const mapStyles = [{ featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#c6c6c6' }] }, { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] }, { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] }, { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] }, { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] }, { featureType: 'water', elementType: 'all', stylers: [{ color: '#dde6e8' }, { visibility: 'on' }] }];

const MyMapComponent = compose(
  withProps({
    googleMapURL: ApiKey,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '250px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{ styles: mapStyles, scrollwheel: false }}
    disableDefaultUI
    defaultMapTypeId="roadmap"
  >
    <Marker
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onMarkerClick}
    />
  </GoogleMap>
));

class Map extends React.PureComponent {
  render() {
    const { lat, lng } = this.props;
    return (
      <MyMapComponent
        lat={parseFloat(lat)}
        lng={parseFloat(lng)}
      />
    );
  }
}

export default Map;
