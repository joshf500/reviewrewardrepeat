import React, { useState,useEffect, useRef } from 'react';
import { View, TextInput,Text, Button, StyleSheet, TouchableOpacity, FlatList, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import Dropdown from 'react-native-input-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { textSpanOverlap } from 'typescript';

const seatClassList = ['Economy', 'Business', 'First']; 

const HomeScreen = ({route, navigation}) => {
   const { user } = route.params;

  const [showDepList, setShowDepList] = useState(false);
  const [depSearchTerm, setDepSearchTerm] = useState('');
  const [depSearchAirportList, setDepSearchAirportList] = useState([]);
  const [arrSearchTerm, setArrSearchTerm] = useState('');
  const [arrSearchAirportList, setArrSearchAirportList] = useState([]);
  const [showArrList, setShowArrList] = useState(false);
  const [airportList, setAirportList] = useState([]);

  const[airlineList, setAirlineList] = useState([])
  const [airlineSearchTerm, setAirlineSearchTerm] = useState('');
  const [showAirlineList, setShowAirlineList] = useState(false);
  const [searchAirlineList, setSearchAirlineList] = useState([])
  const[airline, setAirline] = useState("")
  const[showSeatClassList, setShowSeatClassList]= useState(true);
  const[headline, setHeadline] = useState("")
  const[depYear, setDepYear] = useState("")
  const[depMonth, setDepMonth] = useState("")
  const[depDay, setDepDay] = useState("")
  const[depDate, setDepDate] = useState("")
  const[depAirport,setDepAirport]= useState("")
  const[arrAirport,setArrAirport]= useState("")
  const[seatClass,setSeatClass]= useState("")
  const[groundService, setGroundService] = useState("")
  const[airService, setAirService] = useState("")
  const[comfort, setComfort] =useState("")
  const[food, setFood] = useState("")
  const[ife, setIfe] = useState("")
  const[value, setValue] =useState("")
  const[furtherComments, setFurtherComments] = useState("")
  const[ticketImg, setTicketImg]=useState("")
  const [
    postSuccess,
    setPostSuccess
  ] = useState(false);
  

  const handleScreenTouch = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    fetch(`http://10.129.2.122:5556/airports`)
      .then(res => res.json())
      .then(data => {
        setAirportList(data)
       })
  }, []);

  const handleDepSearchTermChange = (depSearchTerm) => {
    // Perform filtering of airport list based on the search term
    setDepSearchTerm(depSearchTerm)
    const filteredList = airportList.filter((airport) =>
      airport.code.toLowerCase().includes(depSearchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(depSearchTerm.toLowerCase()) ||
      airport.country.toLowerCase().includes(depSearchTerm.toLowerCase()) ||
      airport.name.toLowerCase().includes(depSearchTerm.toLowerCase())

    );
    setDepSearchAirportList(filteredList);
    console.log(filteredList)
  };

  const handleSelectDepAirport = (value) =>{
    setDepAirport(value)
    setShowDepList(!showDepList)
  }

  
  const handleArrSearchTermChange = (arrSearchTerm) => {
    // Perform filtering of airport list based on the search term
    setArrSearchTerm(arrSearchTerm)
    const filteredList = airportList.filter((airport) =>
      airport.code.toLowerCase().includes(arrSearchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(arrSearchTerm.toLowerCase()) ||
      airport.country.toLowerCase().includes(arrSearchTerm.toLowerCase()) ||
      airport.name.toLowerCase().includes(arrSearchTerm.toLowerCase())

    );
    setArrSearchAirportList(filteredList);
    console.log(filteredList)
  };


  const handleSelectArrAirport = (value) =>{
    setArrAirport(value)
    setShowArrList(!showArrList)
  }
 

  const handleAirlineSearchTermChange = (airlineSearchTerm) => {
    // Perform filtering of airport list based on the search term
    setAirlineSearchTerm(airlineSearchTerm)
    const filteredList = airlineList.filter((airline) =>
      airline.title.toLowerCase().includes(airlineSearchTerm.toLowerCase())
    );
    setSearchAirlineList(filteredList);
    console.log(filteredList)
  };
  
  const handleSelectAirline = (value) =>{
    setAirline(value)
    setShowAirlineList(!showAirlineList)
  }


  const handleSetDate = () =>{
    setDepDate(`${depYear}-${depMonth}-${depDay}`)
  }
  
  const handleSeatClassSelection = (value) =>{
    setSeatClass(value)
    setShowSeatClassList(!showSeatClassList)
  }


  
const handleDashboardNavigation = () =>{
  navigation.navigate('ReviewsAndRewardsScreen')
  setPostSuccess(!postSuccess)
}

  useEffect(() => {
    fetch(`http://10.129.2.122:5556/airlines`)
      .then(res => res.json())
      .then(data => {
        setAirlineList(data)

       })
  }, []);

  const handleSubmit = () => {
    fetch('http://10.129.2.122:5556/reviews', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        headline: headline,
        dep_date: depDate,
        airline: airline,
        dep_airport: depAirport,
        arr_airport: arrAirport,
        seat_class: seatClass,
        ground_service: groundService,
        air_service: airService,
        comfort: comfort,
        food: food,
        ife: ife,
        value: value,
        further_comments: furtherComments

      }),
    })
    .then(async r => {
      if ( r.status===201){
        setDepSearchTerm("")
        setDepAirport("")
        setArrSearchTerm("")
        setArrAirport("")
        setDepDay("")
        setDepMonth("")
        setDepYear("")
        setDepDate("")
        setAirline("")
        setGroundService("")
        setAirService("")
        setComfort("")
        setFood("")
        setIfe("")
        setValue("")
        setFurtherComments("")
        console.log("Review created:", r.json())

        fetch(`http://10.129.2.122:5556/addpointstouser/${user.id}`, {
          method: "PATCH",
          headers: {
          'Content-Type': 'application/json',
          },
        })
        .then( response => {
          if (response.status === 200) {
            console.log("Points updated successfully");
            setPostSuccess(true)
          } else {
            console.log("Failed to update points");
          }
        })
        
     }}
    )
  }
  if (postSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'gray',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../Image/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Review posted, {user.first_name}! {'\n'} Check your rewards page or write another review!
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleDashboardNavigation}>
          <Text style={styles.buttonTextStyle}>See Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => setPostSuccess(!postSuccess)}>
          <Text style={styles.buttonTextStyle}>Write Another Review!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleScreenTouch}>
  {/* // <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled"> */}
    <KeyboardAvoidingView style={styles.scrollContainer} behavior="padding">
      {/* <TextInput
        style={styles.input}
        placeholder="Headline"
        onChangeText={(text) => setHeadline(text)}
        value={headline}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={(text) => setDepDate(text)}
        value={depDate}
        keyboardType="numeric"
      /> */}
     
      {/* <Picker
        selectedValue={selectAirline}
        style={styles.input}
        onValueChange={(value) => setSelectAirline(value)}
      >
        <Picker.Item label="Select Airline" value="" />
        {airlines.map((airline, index) => (
          <Picker.Item key={index} label={airline.title} value={selectAirline} />
        ))}
      </Picker> */}
    <View style={styles.topTwoRows} >
      <View style={styles.airportInputContainer}>
          <TextInput
            style={styles.airportInput}
            placeholder="Search Airport"
            onChangeText={handleDepSearchTermChange}
            value={depSearchTerm}
            onFocus={() => setShowDepList(true)}
          />
          {depSearchTerm.length == 0 && (
          <Text style={styles.placeholderText}>Find departure airport by code or city!</Text>
        )}
      
      {showDepList && depSearchTerm.length > 0 && (
        <FlatList
          style={styles.list}
          
          data={depSearchAirportList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={()=>{handleSelectDepAirport(item.code, showDepList)}}>
          <Text  style={styles.item}>{item.code} {item.city}, {item.country}</Text>
          </TouchableOpacity>
          }
        />
        
        )}
      </View>
      <Text>✈️ </Text>
      {depAirport !== null && (
        <TouchableOpacity style={styles.selectedAirportContainer} onPress={()=>setDepAirport(null)}>
              <Text style={styles.selectedAirport}>{depAirport}</Text>
        </TouchableOpacity>
            )}
      
      <View style={styles.airportInputContainer}>
          <TextInput
            style={styles.airportInput}
            placeholder="Search Airport"
            onChangeText={handleArrSearchTermChange}
            value={arrSearchTerm}
            onFocus={() => setShowArrList(true)}
          />
          {arrSearchTerm.length == 0 && (
          <Text style={styles.placeholderText}>Find arrival airport by code or city!</Text>
        )}
      
      {showArrList && arrSearchTerm.length > 0 && (
        <FlatList
          style={styles.list}
          data={arrSearchAirportList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={()=>{handleSelectArrAirport(item.code)}}>
          <Text style={styles.item}>{item.code} {item.city}, {item.country}</Text>
          </TouchableOpacity>
          }
        />
        )}
      </View>

      {arrAirport !== null && (
        <TouchableOpacity style={styles.selectedAirportContainer} onPress={()=>setArrAirport(null)}>
              <Text style={styles.selectedAirport}>{arrAirport}</Text>
        </TouchableOpacity>
            )}

      </View>

      

        
      <View style={styles.topTwoRows}>
      <View style={styles.otherInputContainer}>
          <Text style={styles.placeholderText}>Date of Departure</Text>
            <View style={styles.dateInputContainer} >
          
                <TextInput
                      style={styles.fourDigitInput}
                      keyboardType='numeric'
                      placeholder="YYYY"
                      placeholderTextColor="lightblue"
                      onChangeText={setDepYear}
                      value={depYear}
                    />
                  <TextInput
                      style={styles.oneOrTwoDigitInput}
                      keyboardType='numeric'
                      placeholder="MM"
                      placeholderTextColor="lightblue"
                      onChangeText={setDepMonth}
                      value={depMonth}
                    />
                    <TextInput
                      style={styles.oneOrTwoDigitInput}
                      keyboardType='numeric'
                      placeholder="DD"
                      placeholderTextColor="lightblue"
                      onChangeText={setDepDay}
                      value={depDay}
                    />
                    <TouchableOpacity style={styles.buttons} onPress={handleSetDate}>
                      <Text>Enter Date</Text>
                  </TouchableOpacity>
        
                
              </View>

              <Text style={styles.placeholderText}>{depDate}</Text>
            </View>
        <View style={styles.airlineInputContainer}>
              <TextInput
                style={styles.airportInput}
                placeholder="Search Airline"
                onChangeText={handleAirlineSearchTermChange}
                value={airlineSearchTerm}
                onFocus={() => setShowAirlineList(true)}
              />
            
            {airlineSearchTerm.length == 0 && (
          <Text style={styles.placeholderText} >Search for your airline!</Text>
        )}
       
        {showAirlineList && airlineSearchTerm.length > 0 && (
        <FlatList
          style={styles.list}
          data={searchAirlineList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={()=>handleSelectAirline(item.title)}>
          <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
          }
        />
        )}
       </View>
       {airline !== null && (
              <TouchableOpacity style={styles.selectedAirlineContainer} onPress={()=>setAirline(null)}>
                    <Text style={styles.selectedAirline}>{airline}</Text>
              </TouchableOpacity>
              )}
{/* 
      {airline !== '' && (
        <View style={styles.selectedAirlineContainer}>
              <Text style={styles.selectedAirline}>{airline}</Text>
        </View>
            )} */}
      </View>

      <View style={styles.otherRows}>
      <View style={styles.otherInputContainer}>
              {/* {seatClass == null && ( */}
              <FlatList
                style={styles.list}
                data={seatClassList}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                <TouchableOpacity onPress={()=>handleSeatClassSelection(item)}>
                <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
                }
              />
              {/* )} */}
            
          </View>
          <View style={styles.otherInputContainer}>
          {seatClass !== null && (
                    <TouchableOpacity style={styles.buttons} onPress={()=>setSeatClass(null)}>
                          <Text style={styles.selectedAirline}>{seatClass}</Text>
                    </TouchableOpacity>
              )}
              </View>
        <View style={styles.otherInputContainer}>
          <Text style={styles.placeholderText}>Headline</Text> 
            <TextInput
                  style={styles.headline}
                  multiline={true}
                  placeholder="Headline"
                  placeholderTextColor="lightblue"
                  onChangeText={setHeadline}
                  value={headline}
                />
            {/* <Text style={styles.placeholderText}>{headline}</Text>  */}
        </View>
        
         </View>
         <View style={styles.otherRows}>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>Ground Service (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setGroundService}
                          value={groundService}
                        />
            </View>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>Air Service (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setAirService}
                          value={airService}
                        />
            </View>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>Comfort (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setComfort}
                          value={comfort}
                        />
            </View>



        </View>

        <View style={styles.otherRows}>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>Food (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setFood}
                          value={food}
                        />
            </View>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>In-Flight Entertainment (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setIfe}
                          value={ife}
                        />
            </View>
            <View style={styles.otherInputContainer}>
              <Text style={styles.ratingsText}>Overall value (1-5)</Text> 
                  <TextInput
                          style={styles.oneOrTwoDigitInput}
                          keyboardType='numeric'
                          onChangeText={setValue}
                          value={value}
                        />
            </View>
        </View>

        <View style={styles.otherRows}>
        <View style={styles.otherInputContainer}>
          <Text style={styles.placeholderText}>Further Comments?</Text> 
            <TextInput
                  style={styles.comments}
                  multiline={true}
                  placeholder="Comments"
                  placeholderTextColor="lightblue"
                  onChangeText={setFurtherComments}
                  value={furtherComments}
                />
            {/* <Text style={styles.placeholderText}>{headline}</Text>  */}
        </View>
        <View style={styles.otherInputContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                          <Text style={styles.selectedAirline}>Submit</Text>
            </TouchableOpacity>

        </View>
        
      </View>





      
     
      {/* >
      
      <TextInput
        style={styles.input}
        placeholder="Ground Service Rating (1-5)"
        onChangeText={(text) => setGroundService(text)}
        value={groundService}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Air Service Rating (1-5)"
        onChangeText={(text) => setAirService(text)}
        value={airService}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Comfort Rating (1-5)"
        onChangeText={(text) => setComfort(text)}
        value={comfort}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Food Rating (1-5)"
        onChangeText={(text) => setFood(text)}
        value={food}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="IFE Rating (1-5)"
        onChangeText={(text) => setIfe(text)}
        value={ife}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Value Rating (1-5)"
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Further Comments"
        onChangeText={(text) => setFurtherComments(text)}
        value={furtherComments}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Ticket Image"
        onChangeText={(text) => setTicketImg(text)}
        value={ticketImg}
      />
      <Button title="Submit" onPress={handleSubmit} /> */}
    </KeyboardAvoidingView>
   
  </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:300,
    backgroundColor:"gray",
    bottom:30
  },
  container: {
    flexGrow: 1,
    flex: 1,
    padding: 5,
    backgroundColor: 'gray',
    alignItems: 'top',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  
  },
  topTwoRows:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom:10,
    
  },
  otherRows:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    position:"relative",
    bottom:10,
    justifyContent:"center"

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
    fontWeight: 'bold',
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
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 14,
    color: 'white',
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
    justifyContent:"center"
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







