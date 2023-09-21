// import React, { useState, useEffect } from 'react';
// import { View, Animated, StyleSheet, Dimensions } from 'react-native';
// import Svg, { Line } from 'react-native-svg';

// const LoadingScreen = () => {
//   const [fillValue] = useState(new Animated.Value(0));
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     Animated.timing(fillValue, {
//       toValue: 1,
//       duration: 3000, // Set the duration of the filling animation
//       useNativeDriver: false, // Make sure to set this to false for SVG animations
//     }).start();
//   }, []);

//   const fill = fillValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, screenWidth],
//   });

//   return (
//     <View style={styles.container}>
//       <Svg width={screenWidth} height={10}>
//       <line x1="10" y1="10" x2="90" y2="50" stroke="black" />
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
// });

// export default LoadingScreen;
