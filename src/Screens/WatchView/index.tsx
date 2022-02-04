import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 24px;
`;

interface Props {}

interface ILocation {
  latitude: number;
  longitude: number;
}

const WatchView = ({}: Props) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
    let _watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);

  return (
    <Container>
      {location ? (
        <>
          <Label>Latitude: {location.latitude}</Label>
          <Label>Longitude: {location.longitude}</Label>
        </>
      ) : (
        <Label>Loading...</Label>
      )}
    </Container>
  );
};

export default WatchView;
