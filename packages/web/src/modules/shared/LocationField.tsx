import * as React from 'react';
import { FieldProps } from 'formik';
import Geosuggest, { Suggest } from 'react-geosuggest';

import './geosuggest.css';

export class LocationField extends React.PureComponent<FieldProps<any> & {}> {
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
    console.log(place);
  };

  render() {
    // const {
    //   field: { onChange, onBlur: __, ...field }, // { name, value, onChange, onBlur }
    //   form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    //   ...props
    // } = this.props;

    return (
      <div>
        <Geosuggest
          placeholder="Search for a location"
          onSuggestSelect={this.onSuggestSelect}
        />
      </div>
    );
  }
}
