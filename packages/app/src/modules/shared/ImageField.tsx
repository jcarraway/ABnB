import * as React from 'react';
import { FieldProps } from 'formik';
import { Button } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';

export class ImageField extends React.Component<
  FieldProps<any> & { title: string }
> {
  onPress = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollPerm === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({});
      if (!result.cancelled) {
        const file = new ReactNativeFile({
          uri: result.uri,
          type: result.type,
          name: 'photo',
        });
        const {
          field: { name },
          form: { setFieldValue },
        } = this.props;
        setFieldValue(name, file);
      }
    }
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: _, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;

    return <Button {...props} onPress={this.onPress} />;
  }
}
