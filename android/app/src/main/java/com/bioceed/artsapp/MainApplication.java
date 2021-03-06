package com.bioceed.artsapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // Packages that cannot be autolinked
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCPickerPackage(),
            new AsyncStoragePackage(),
            new GeolocationPackage(),
            new RNFetchBlobPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNDeviceInfo(),
            new NetInfoPackage(),
            new VectorIconsPackage(),
            new SQLitePluginPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
