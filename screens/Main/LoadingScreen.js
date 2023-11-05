import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate loading progress
      if (progress < 1) {
        setProgress(progress + 0.1);
      } else {
        clearInterval(interval);
        // Navigate to the next screen when loading is complete
        navigation.navigate('Home');
      }
    }, 100); // Change the interval as needed

    return () => clearInterval(interval);
  }, [progress, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Your logo here */}
         <Image source={require("../../assets/logo2.png")}
            style={styles.logo}
          />
        {/* Progress bar */}
        <ProgressBar
          progress={progress}
          width={200}
          color="#1697C7"
          borderColor="#bfc1c2"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  content: {
    alignItems: 'center',
  },
  logo:{
    width:700,
    height:250,
    left:40
  },
});

export default LoadingScreen;
