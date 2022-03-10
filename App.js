/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 // TO release build :   ./gradlew app:assembleRelease

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer, } from '@react-navigation/native';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from './src/Splash/splash';
import OnBoardingScreen from './src/OnBoardingScreens/onboarding';
import Category from './src/Quiz/categories';
import Signs from './src/Signs/Signs';
import Course from './src/Courses/courses';
import Stats from './src/Statistics/Stats';
import HomeScreen from './src/Home/home';
import SignDetail from './src/Signs/signDetail';
import CourseDetail from './src/Courses/courseDetail';
import Test from './src/Quiz/test';
import Series from './src/Quiz/series';
import Result from './src/Quiz/result';
import ClientLayer from './Components/Layers/ClientLayer';
import ReportGrid from './src/Statistics/reportGrid';
import Voice from './src/Quiz/voice';
import Report from './src/Report/report';
import CourseCategory from './src/Courses/courseCategory';

const RootStack = createStackNavigator();

const InitializeComponents = () => {
     ClientLayer.createInstance();
     ClientLayer.getInstance().InitializeWithCallBack( 
       () => {
          console.log("Client Layer Initialization Success");
       },
       () => {
        console.log("Client Layer Initialization Error");
       } 
       );  
       
}

const ConfigureAdmob = () => {
  admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    // Request config successfully set!
  });
}

const App = () => {

  InitializeComponents();
  ConfigureAdmob();
  

  return (
    <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
          >
              <RootStack.Screen name="Splash" component={SplashScreen} 
              options={{headerShown: false}}
              />
              <RootStack.Screen name="OnBoarding" component={OnBoardingScreen}
              options={{headerShown: false}} 
              />
              <RootStack.Screen name="Home" component={HomeScreen}
              options={{headerShown: false}}
              />
              <RootStack.Screen name="Category" component={Category}
              />
              <RootStack.Screen name="Sign" component={Signs}
              options={{headerTitle: "Sign Categories"}}
              />
              <RootStack.Screen name="Course" component={Course}
              />
              <RootStack.Screen name="Stats" component={Stats}
              />
              <RootStack.Screen name="SignDetail" component={SignDetail}
              />
              <RootStack.Screen name="CourseDetail" component={CourseDetail}
              />
              <RootStack.Screen name="Series" component={Series}
              />
              <RootStack.Screen name="Test" component={Test}
              // options={{headerShown: false}}
              />
              <RootStack.Screen name="Result" component={Result}
              />
              <RootStack.Screen name="Report" component={Report}
              />
              <RootStack.Screen name="Voice" component={Voice}
              />
              <RootStack.Screen name="ReportGrid" component={ReportGrid}
              />
              <RootStack.Screen name="CourseCategory" component={CourseCategory}
              options={{headerTitle: "Course Categories"}}
              />
          </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
 
export default App;
