import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Permission,
} from 'react-native';
import OpticalTextRecognition from 'react-native-optical-text-recognition';
import ImagePicker from 'react-native-image-picker';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    OpticalTextRecognition.multiply(3, 7).then(setResult);
  }, []);

  const requestPermission = async (permission: Permission) => {
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Permission',
        message: 'need permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    const getPermission = async () => {
      await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
      await requestPermission(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    };
    getPermission();
  });

  const options = {
    title: 'Select image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onPress = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response:', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        OpticalTextRecognition.detectFromUri(uri).then((res) =>
          console.log('res', res)
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button title="scan" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
