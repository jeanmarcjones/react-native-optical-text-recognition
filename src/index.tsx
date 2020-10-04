import { NativeModules } from 'react-native';

type OpticalTextRecognitionType = {
  multiply(a: number, b: number): Promise<number>;
};

const { OpticalTextRecognition } = NativeModules;

export default OpticalTextRecognition as OpticalTextRecognitionType;
