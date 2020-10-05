package com.reactnativeopticaltextrecognition;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.Text.Element;
import com.google.mlkit.vision.text.Text.Line;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;

import java.io.IOException;
import java.util.List;

public class OpticalTextRecognitionModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  private final TextRecognizer textRecognizer;

  public OpticalTextRecognitionModule (ReactApplicationContext context) {
    super(context);
    reactContext = context;
    textRecognizer = TextRecognition.getClient();
  }

  public String getName() {
    return "OpticalTextRecognition";
  }

  // Example method
  // See https://facebook.github.io/react-native/docs/native-modules-android
  @ReactMethod
  public void multiply (int a, int b, Promise promise) {
    promise.resolve(a * b);
  }

  @ReactMethod
  public void detectFromUri (String uri, Promise promise) {
    InputImage image;
    try {
      image = InputImage.fromFilePath(reactContext, android.net.Uri.parse(uri));
      Task<Text> result = textRecognizer.process(image);
    } catch (IOException e) {
      e.printStackTrace();
      promise.reject(e);
    }
  }

  protected void onSuccess(@NonNull Text text, @NonNull Promise promise) {
    promise.resolve(text);
  }

  protected void onFailure(@NonNull Exception e, @NonNull Promise promise) {
    promise.reject(e);
  }

}
