import { NativeModules } from 'react-native';

interface OpticalTextRecognitionType {
  multiply(a: number, b: number): Promise<number>;
  detectFromUri(uri: string): Promise<string>;
}

const { OpticalTextRecognition } = NativeModules;

export default OpticalTextRecognition as OpticalTextRecognitionType;
