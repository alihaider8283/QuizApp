'use strict';
import {Image} from 'react-native';

class Pages {

  pagesList = [
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../assets/Icons/quiz.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../../assets/Icons/sign.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../../assets/Icons/stats.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      }
  ]

  static getPages() {
      return this.pagesList
  }

}

export default Pages