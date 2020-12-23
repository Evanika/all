import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, Dimensions} from 'react-native';

export default function ({children}) {
  const [width, setWidth] = useState(Dimensions.get('screen').width);
  const carousel = useRef(null);

  useEffect(() => {
    const Resize = ({window}) => setHeight(window.height);
    Dimensions.addEventListener('change', Resize);
    return () => Dimensions.removeEventListener('change', Resize);
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
      ref={carousel}
      contentContainerStyle={{
        width: `${100 * children.length}%`,
      }}
    ></ScrollView>
  );
}
