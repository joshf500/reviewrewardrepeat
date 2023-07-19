
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNPJhEa_p3T2npA59BftJmLBY8j_pBXpM1w&usqp=CAU" }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;