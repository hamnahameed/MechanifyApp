import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const BottomSheetExample = () => {
    const bottomSheetModalRef = React.useRef(null);
  
    useEffect(() => {
        bottomSheetModalRef.current?.present();
      }, []);
  
      const navigation = useNavigation();
    return (
      
  
        <BottomSheetModalProvider >
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['30%', '50%', '90%']} 
        
      >
          <BottomSheetScrollView>
            {/* Content for the bottom sheet */}
            <View style={{ padding: 16 }}>
              <Text style={styles.button}   onPress={() => {navigation.navigate('ServiceRequestsScreen');}}>View All Requests</Text>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  };
  
  export default BottomSheetExample;
  
  const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1697c7',
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 100,
        marginLeft:50,
        textAlign:'center',
        width:300,
        borderRadius: 10,
        fontSize: 18,
        color: '#fff',
      },
    })