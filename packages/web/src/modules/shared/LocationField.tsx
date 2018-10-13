import * as React from 'react';
import { FieldProps } from 'formik';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import './geosuggest.css';

interface DefaultCenter {
  lat: number;
  lng: number;
}

const MapWithAMarker = withGoogleMap<{
  defaultCenter: DefaultCenter;
  lat: number;
  lng: number;
  onClick: (e: google.maps.MouseEvent | google.maps.KmlMouseEvent) => void;
}>(props => (
  <GoogleMap
    defaultZoom={8}
    center={{ lat: props.lat, lng: props.lng }}
    defaultCenter={props.defaultCenter}
    onClick={props.onClick}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

interface State {
  defaultCenter: DefaultCenter | null;
}

export class LocationField extends React.PureComponent<
  FieldProps<any> & {},
  State
> {
  state: State = {
    defaultCenter: null,
  };

  onSuggestSelect = (place: Suggest) => {
    const { lat, lng } = place.location;
    const {
      form: { setValues, values },
    } = this.props;
    setValues({
      ...values,
      latitude: lat,
      longitude: lng,
    });
    this.setState({
      defaultCenter: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    });
  };

  render() {
    const {
      form: { values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    } = this.props;

    return (
      <div>
        <Geosuggest
          placeholder="Search for a location"
          onSuggestSelect={this.onSuggestSelect}
        />
        {this.state.defaultCenter && (
          <MapWithAMarker
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={this.state.defaultCenter}
            lat={values.latitude}
            lng={values.longitude}
            onClick={x => {
              const lat = x.latLng.lat();
              const lng = x.latLng.lng();

              setValues({
                ...values,
                latitude: lat,
                longitude: lng,
              });
            }}
          />
        )}
      </div>
    );
  }
}
