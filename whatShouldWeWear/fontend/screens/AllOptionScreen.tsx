import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
interface RouteParams {
    selectedOptions: string[];
}

const AllOptionsScreen: React.FC = () => {
    const route = useRoute();
    const { selectedOptions } = route.params as RouteParams;
    const day = selectedOptions[0]
    const colorDay = selectedOptions[1]

    type Colorm = {
        day: string;
        badLuckColor: string[];
        luckyColor: string[];
    };
    const fetchData = (color: string) => {
        axios.get<Colorm>('http://127.0.0.1:8000/colormatch/'+ color)
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
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>สีเสื้อแนะนำสำหรับ {day} คือ </Text>
                <Icon name="shirt" size={80} color={colorDay[1]} />
                <Text>
                    {selectedOptions[1][0]}
                </Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default AllOptionsScreen;
