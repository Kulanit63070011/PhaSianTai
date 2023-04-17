import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
  selectedOptions: string[];
}
interface CustomButtonProps {
  title: string;
  age: string;
  backgroundColor: string;
  width: string;
  isSelected: boolean;
}

const Option2Screen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedOptions: optionsFromPreviousScreen } = route.params as RouteParams;
  const [selectedOptions, setSelectedOptions] = useState(optionsFromPreviousScreen);
  const CustomButton: React.FC<CustomButtonProps> = ({ title, age, backgroundColor, width, isSelected }) => {
    return (
      <TouchableOpacity onPress={() => handleOptionPress(age)} style={[styles.button, { backgroundColor: isSelected ? '#999' : backgroundColor, width: 300 }]}>
        <Text style={[styles.text, { color: isSelected ? '#fff' : 'white' }]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const handleOptionPress = (option: string) => {
    const newOptions = [...optionsFromPreviousScreen, option];
    setSelectedOptions(newOptions);
  };

  const goToAllOptions = () => navigation.navigate('AllOptions', { selectedOptions });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[{ width: '1000' }]}>
          <CustomButton title="children" age="children" width='100px' backgroundColor="black" isSelected={selectedOptions[1] == "children"}  />
          <CustomButton title="teenage" age="teenage" width='100px' backgroundColor="black" isSelected={selectedOptions[1] == "teenage"}    />
          <CustomButton title="adult" age="adult" width='100px' backgroundColor="black" isSelected={selectedOptions[1] == "adult"}    />
          <Button title="Next" onPress={goToAllOptions} />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ea1b15',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    height: '500px',
    justifyContent: 'center',
    width: '95%'
  },

  button: {
    marginBottom: 5,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
    color: '#fff',
  },
});
export default Option2Screen;
