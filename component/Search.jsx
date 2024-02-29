import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from "axios";
import { StyleSheet, Switch, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { API_ROUTES } from './Api';


const search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [isMovie, setIsMovie] = useState(true);
    const [selectedResult, setSelectedResult] = useState(null);

    let route = "";

    if (isMovie) {
        route = API_ROUTES.MOVIESEARCH;
    } else {
        route = API_ROUTES.SERIESEARCH;
    }

    useEffect(() => {
        const getResults = async () => {
            if (searchValue.length >= 2) {
                const options = {
                    method: 'GET',
                    url: route + searchValue,
                    headers: {
                        accept: 'application/json',
                        Authorization: token
                    }
                };
                try {
                    const response = await axios(options);
                    setResults(response.data.results);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setResults([]);
            }
        };
        getResults();
    }, [searchValue]);

    const toggleSwitch = () => {
        setIsMovie(previousState => !previousState);
        setSearchValue("");
    }

    const handleResultClick = (index) => {
        setSelectedResult(index);
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder={isMovie ? "Film" : "Série"}
                />
                <Switch
                    thumbColor={isMovie ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isMovie}
                />
            </View>
            <View style={styles.results}>
                {results.map((result, index) => (
                    <TouchableOpacity style={styles.result} key={index} onPress={() => handleResultClick(index)}>
                        {result.poster_path ? (
                            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${result.poster_path}` }} />
                        ) : (
                            <View>
                                <Text style={styles.center}>{result.title || result.name}</Text>
                            </View>
                        )}
                        {selectedResult === index && (
                            <View style={styles.dropdown}>
                                <Text style={styles.center}>{result.title || result.name}</Text>
                                <Text style={styles.center}>{moment(result.release_date || result.first_air_date).format("DD/MM/YYYY")}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default search;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        width: '60%',
        padding: 5,
    },
    results: {
        paddingTop: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    result: {
        flexBasis: '45%',
        padding: 10,
        height: 200,
    },
    image: {
        flex: 0,
        width: '100%',
        height: '100%',
    },
    center: {
        textAlign: 'center',
    },
    dropdown: {
        padding: 10,
    },
});
