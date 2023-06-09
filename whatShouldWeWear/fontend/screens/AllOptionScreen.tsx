import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Button } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular, Kanit_600SemiBold } from '@expo-google-fonts/kanit';

interface RouteParams {
    selectedOptions: string[];
}
interface CustomButtonProps {
    title: string;
    fcolor: string;
    backgroundColor: string;
    width: string;
}
const AllOptionsScreen: React.FC = () => {
    const route = useRoute();
    const { selectedOptions } = route.params as RouteParams;
    const day = selectedOptions[0]
    const colorDay = selectedOptions[1]
    const [toggleShow, setToggleShow] = useState(false)
    const [colorM, setColorM] = useState<string[]>([]);
    const fcolor = colorDay[0].split(' ')[colorDay[0].split(' ').length - 1]
    console.log(typeof (fcolor))
    console.log(fcolor)
    type Colorm = {
        colorm: string[];
    };

    const [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_600SemiBold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    const CustomButton: React.FC<CustomButtonProps> = ({ title, fcolor, backgroundColor, width }) => {
        // console.log("fcolor == " + fcolor)
        return (
            <TouchableOpacity onPress={() => fetchData(fcolor)} style={[styles.button, { backgroundColor: toggleShow ? '#999' : backgroundColor, width: 300 }]}>
                <Text style={[styles.text, { color: toggleShow ? '#fff' : 'white' }]}>{title}</Text>
            </TouchableOpacity>
        );
    };
    const fetchData = (color: string) => {
        setToggleShow(!toggleShow)
        axios.get<Colorm>('http://13.251.60.170:8000/colormatch/' + color)
            .then(response => {
                setColorM(response.data)
                console.log(response.data + "daa" + colorM)
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>สีเสื้อแนะนำสำหรับ {day} คือ </Text>
                <Icon name="shirt" size={80} color={colorDay[1]} />
                <Text style={[{paddingBottom:'10px', fontWeight:'bold'}]}>
                    {selectedOptions[1][0]}
                </Text>
                {/* fcolor={colorDay[1].split(' ')[-1]} */}
                <CustomButton title="Show Match Color" fcolor={fcolor} width='100px' backgroundColor="black" />
                
                {toggleShow && (
                    <View style={[styles.card2]}>
                        <View style={styles.buttonRow}>
                        {colorM.map((option, index) => (
                            <Text key={index} style={[ styles.text2,{ color: 'black', fontWeight: 'bold'}]}>
                                {option}
                            </Text>
                        ))}
                        </View>
                    </View>
                )}

                {/* {selectedOptions.map((option, index) => (
                    <Text key={index} style={[{ color: 'black' }]}>
                        {option}
                    </Text>
                ))} */}

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
        fontFamily: 'Kanit_400Regular'
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
    card2: {
        backgroundColor: '#1ecbe1',
        borderRadius: 10,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
        height: '200px',
        justifyContent: 'center',
        width: '95%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Kanit_400Regular'
    },
    option: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
    text2:{
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
});

export default AllOptionsScreen;
