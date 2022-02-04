/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #eee;
`;

const WeatherContainer = styled(FlatList)``;

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Loading = styled.ActivityIndicator`
  margin-bottom: 16px;
`;
const LoadingLabel = styled.Text`
  font-size: 16px;
`;

const WeatherItemContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Weather = styled.Text`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
`;
const Temperature = styled.Text`
  font-size: 16px;
`;

interface Props {}

const API_KEY = '13bce90e3fd5d96ec964736f5684a5fb';

interface IWeather {
  temperature?: number;
  weather?: string;
  isLoading: boolean;
}

const WeatherView = ({}: Props) => {
  const [weatherInfo, setWeatherInfo] = useState<IWeather>({temperature: undefined, weather: undefined, isLoading: false});

  const getCurrentWeather = () => {
    setWeatherInfo({isLoading: false});
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
          .then(response => {
            setWeatherInfo({
              temperature: response.data.main.temp,
              weather: response.data.weather[0].main,
              isLoading: true,
            });
          })
          .catch(error => {
            console.log('error: ', error);
            setWeatherInfo({isLoading: true});
            showError('날씨 정보를 가져오는데 실패하였습니다.');
          });
      },
      error => {
        console.log(error.code, error.message);
        setWeatherInfo({isLoading: true});
        showError('위치 정보를 가져오는데 실패하였습니다.');
      },
    );
  };

  const showError = (message: string): void => {
    setTimeout(() => {
      Alert.alert(message);
    }, 500);
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
    }
    getCurrentWeather();
  }, []);

  let data = [];
  const {isLoading, weather, temperature} = weatherInfo;
  if (weather && temperature) {
    data.push(weatherInfo);
  }

  return (
    <Container>
      <WeatherContainer
        onRefresh={() => getCurrentWeather()}
        refreshing={!isLoading}
        data={data}
        keyExtractor={(item, index) => {
          return `Weather-${index}`;
        }}
        ListEmptyComponent={
          <LoadingView>
            <Loading size="large" color="#1976D2" />
            <LoadingLabel>Loading...</LoadingLabel>
          </LoadingView>
        }
        renderItem={({item}) => (
          <WeatherItemContainer>
            <Weather>{(item as IWeather).weather}</Weather>
            <Temperature>({(item as IWeather).temperature}°C)</Temperature>
          </WeatherItemContainer>
        )}
        contentContainerStyle={{flex: 1}}
      />
    </Container>
  );
};

export default WeatherView;
