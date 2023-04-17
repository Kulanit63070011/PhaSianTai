import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

const Option1Screen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [day, setDay] = useState('')
    const [randomColor, setRandomColor] = useState('')

    const [fontsLoaded] = useFonts({
        Kanit_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    interface CustomButtonProps {
        title: string;
        index: string;
        backgroundColor: string;
        width: string;
        isSelected: boolean;
    }

    type Day = {
        day: string;
        badLuckColor: string[];
        luckyColor: string[];
    };

    const CustomButton: React.FC<CustomButtonProps> = ({ title, index, backgroundColor, width, isSelected }) => {
        return (
            <TouchableOpacity onPress={() => handleOptionPress(index)} style={[styles.button, { backgroundColor: isSelected ? '#999' : backgroundColor, width }]}>
                <Text style={[styles.text, { color: isSelected ? '#fff' : 'white' }]}>{title}</Text>
            </TouchableOpacity>
        );
    };

    const goToOption2 = () => {
        if(day != ''){
            navigation.navigate('Option2', { selectedOptions });
        }
        }
    

    const fetchData = (index: string) => {
        axios.get<Day>('http://127.0.0.1:8000/colorDay/' + index)
            .then(response => {
                setDay(response.data.day);
                const luckyColorList = response.data.luckyColor;
                console.log("-- " +luckyColorList+ " --")
                const rdColor = luckyColorList[Math.floor(Math.random() * luckyColorList.length)]
                setRandomColor(rdColor);
                console.log("++ " +rdColor+ " ++")
                console.log(day)
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };


    const handleOptionPress = (index: string) => {
        console.log(index);
        fetchData(index);
        setSelectedOptions([day,randomColor]);
        console.log(selectedOptions)
    };



    return (
        <View style={[styles.container, { backgroundColor: '#ea1b15' }]}>
            <View style={styles.card}>

                <View style={styles.buttonRow}>
                    <CustomButton width='100px' title="Monday" index='0' backgroundColor="black" isSelected={day.includes('Monday')} />
                    <CustomButton width='100px' title="Tuesday" index='1' backgroundColor="black" isSelected={day.includes('Tuesday')} />
                </View>
                <View style={styles.buttonRow}>
                <CustomButton width='100px' title="Wednesday" index='2' backgroundColor="black" isSelected={day.includes('Wednesday')} />
                    <CustomButton width='100px' title="Thursday" index='3' backgroundColor="black" isSelected={day.includes('Thursday')} />
                    <CustomButton width='100px' title="Friday" index='4' backgroundColor="black" isSelected={day.includes('Friday')} />
                </View>
                <View style={styles.buttonRow}>
                    <CustomButton width='100px' title="Saturday" index='5' backgroundColor="black" isSelected={day.includes('Saturday')} />
                    <CustomButton width='100px' title="Sunday" index='6' backgroundColor="black" isSelected={day.includes('Sunday')} />
                </View>
                <View style={[{alignItems: 'center'}]}>
                    <TouchableOpacity onPress={goToOption2} style={[styles.button, { backgroundColor: 'blue'}]}>
                        <Text style={styles.text}>Go to Option2</Text>
                    </TouchableOpacity>
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    text: {
        fontSize: 16,
        fontFamily: 'Kanit_400Regular',
        color: '#fff',
    },
});

export default Option1Screen;
