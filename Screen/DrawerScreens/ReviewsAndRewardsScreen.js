

// Import React and Component
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';

const ReviewsAndRewardsScreen = ({navigation}) => {
  // const { user } = route.params;
  const[userPoints, setUserPoints] = useState(null)

  const reward1Cost= 100
  const reward2Cost= 300
  const reward3Cost= 1500
  const reward4Cost= 9000
 
    const fetchUserPoints = () => {
      fetch(`http://10.129.2.122:5556/check_session`)
        .then(response => response.json())
        .then(data => {
          setUserPoints(data.points);
        })
        .catch(error => {
          console.log('Error fetching user points:', error);
        });
    };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserPoints();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topTwoRows}>
        <View style={styles.otherInputContainer}>
          <Text style={styles.placeholderText}> Current Points:💰 {userPoints}</Text>
        </View>
      </View>

      <View style={styles.otherRows}>
        <View style={styles.otherInputContainer}>
        <Image
         source={require('../../Image/BOTTLEIMAGE.jpg')}
          style={{width: 150, height: 100, marginLeft: 5}}
        />
        </View>
        <View style={styles.otherInputContainer}>
          <Text style={styles.regularText}> 10% off at Bob's Premium Water Bottles:</Text>
          <Text style={styles.placeholderText}> 💰 {reward1Cost} points</Text>
          {userPoints >= reward1Cost && (
                    
                          <Text style={styles.selectedAirline}>✅ Redeemable!</Text>
                  
            )}
          {userPoints < reward1Cost && (
                    
                    <Text style={styles.selectedAirline}>❌ You don't have enough points!</Text>
            
      )}
        </View>
      </View>



      <View style={styles.otherRows}>
        <View style={styles.otherInputContainer}>
        <Image
          source={require('../../Image/PILLOWIMAGE.jpg')}
          style={{width: 180, height: 160, marginLeft: 5}}
        />
        </View>
        <View style={styles.otherInputContainer}>
          <Text style={styles.regularText}> $15 off $50+ at Patrick's Plane Pillows:</Text>
          <Text style={styles.placeholderText}> 💰 {reward2Cost} points</Text>
          {userPoints >= reward2Cost && (
                    
                          <Text style={styles.selectedAirline}>✅ Redeemable!</Text>
                  
            )}
          {userPoints < reward2Cost && (
                    
                    <Text style={styles.selectedAirline}>❌ Earn more points to redeem!</Text>
            
      )}
        </View>




      </View>

       <View style={styles.otherRows}>
        <View style={styles.otherInputContainer}>
        <Image
          source={require('../../Image/SUITCASEIMAGE.jpg')}
          style={{width: 180, height: 120, marginLeft: 5}}
        />
        </View>
        <View style={styles.otherInputContainer}>
          <Text style={styles.regularText}> 10% off at Sarah's Famous Suitcases:</Text>
          <Text style={styles.placeholderText}> 💰 {reward3Cost} points</Text>
          {userPoints >= reward3Cost && (
                    
                          <Text style={styles.selectedAirline}>✅ Redeemable!</Text>
                  
            )}
          {userPoints < reward3Cost && (
                    
                    <Text style={styles.selectedAirline}>❌ You don't have enough points!</Text>
            
      )}
        </View>
      </View>
      <View style={styles.otherRows}>
        <View style={styles.otherInputContainer}>
        <Image
          source={require('../../Image/50IMAGE.jpg')}
          style={{width: 190, height: 110, marginLeft: 5}}
        />
        </View>
        <View style={styles.otherInputContainer}>
          <Text style={styles.regularText}> Free Signed Copy of 50 Shades of Yinson:</Text>
          <Text style={styles.placeholderText}> 💰 {reward4Cost} points</Text>
          {userPoints >= reward4Cost && (
                    
                          <Text style={styles.selectedAirline}>✅ Redeemable!</Text>
                  
            )}
          {userPoints < reward4Cost && (
                    
                    <Text style={styles.selectedAirline}>❌ You don't have enough points!</Text>
            
      )}
        </View>
      </View>

    </SafeAreaView>
  );
};

export default ReviewsAndRewardsScreen;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:300,
    backgroundColor:"lightgray",
    bottom:30
  },
  container: {
    flexGrow: 1,
    flex: 1,
    padding: 5,
    backgroundColor: 'lightgray',
    alignItems: 'top',
    flexDirection: 'column',
    justifyContent: 'flex-start',

  },
  topTwoRows:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom:10,
    bottom:15
    
  },
  otherRows:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    position:"relative",
    bottom:10,
    justifyContent:"center",
    marginBottom:90

  },
  airportInputContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'left',
    height:60,
  
  },
  airlineInputContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    height:60,
  
  },
  airportInput: {
    height: 25,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 12,
    color:'white'
  },
  selectedAirportContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    justifyContent: 'center',
    // width: 40,
    height:30,
    position: 'relative', // Add relative positioning
    right: 80,
    justifyContent:"center"
  },
  selectedAirport: {
    fontSize: 16,
    textAlign: 'center'
  },
  selectedAirlineContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    justifyContent: 'center',
    // width: 200,
    position: 'relative', // Add relative positioning
    right: 90,
    height:25,
    justifyContent:"center"
  },
  selectedAirline: {
    fontSize: 20,
  
    textAlign: 'center'
  },
  list: {
    // flex: 1,
    marginTop: 7,
    position: "relative",
    left:10,
    width: 160,
  },
  item: {
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'white',
    fontSize:12,
    color:"white"

  },
  placeholderText: {
    fontFamily:"System",
    fontSize: 16,
    color: 'black',
    flexWrap: 'wrap',
    marginTop:0,
    // borderWidth:1,
    // borderColor:"white"
  },
  regularText: {
    fontFamily:"System",
    fontSize: 16,
    fontWeight:"bold",
    color: 'black',
    flexWrap: 'wrap',
    marginTop:0,
    // borderWidth:1,
    // borderColor:"white"
  },
  otherInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
    height:60,
    justifyContent:"center",
    width:170
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    height:20,
    justifyContent:"center"
  },
  headline: {
    height: 20,
    width: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "white"
  },
  fourDigitInput: {
    height: 20,
    width: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 12,
    color: "white",
    textAlign:"center"
  },
  oneOrTwoDigitInput: {
    height: 20,
    width: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 0,
    fontSize: 12,
    color: "white",
    textAlign:"center",
    marginLeft:7
  },
  buttons: {
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    marginLeft:7
    // justifyContent: 'center',
    // width: 40,
    // Add relative positioning

  },
  ratingsText: {
    fontFamily:"System",
    fontSize: 12,
    color: 'white',
    flexWrap: 'wrap',
    marginTop:0,
    // borderWidth:1,
    // borderColor:"white"
  },
  comments: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "white"
  },
  submitButton: {
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    marginLeft:7,
    // justifyContent: 'center',
    top:8,
    width: 60,
    height:40,
    justifyContent:"center"
    // Add relative positioning

  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: 'lightgreen',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
});
