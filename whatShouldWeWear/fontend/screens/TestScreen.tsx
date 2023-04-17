import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


type Day = {
  day: string;
  badLuckColor: string;
  luckyColor: string;
};

const TestSceen = () => {
  const [day, setDay] = useState('')
  const [randomColor, setRandomColor] = useState('')

  const select = (index: string) => {
    axios.get<Day>('http://127.0.0.1:8000/colorDay/' + index)
      .then(response => {
        // Handle successful response
        setDay(response.data.day)
        const luckyColorList = response.data.luckyColor
        setRandomColor(luckyColorList[Math.floor(Math.random() * luckyColorList.length)])
        // Process the data as needed
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
      console.log(typeof (randomColor))
      console.log(day + " : " + randomColor)
  }

  const navigation = useNavigation();
  const goToHome = () => navigation.navigate("What_should_i_wear");
  return (
    <View>
      <Text>What day we wear?</Text>
      <View>
        <Button title='Monday' onPress={() => select("0")}></Button>
        <Button title='Tuesday' onPress={() => select("1")}></Button>
        <Button title='Wednesday' onPress={() => select("2")}></Button>
        <Button title='Thursday' onPress={() => select("3")}></Button>
        <Button title='Friday' onPress={() => select("4")}></Button>
        <Button title='Saturday' onPress={() => select("5")}></Button>
        <Button title='Sunday' onPress={() => select("6")}></Button>
      </View>
      <Button title='next' onPress={goToHome}></Button>
    </View>
  )
}
export default TestSceen;