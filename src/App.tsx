import React from 'react';
import styled from 'styled-components/native';

import WeatherView from './Screens/WeatherView';

const Container = styled.View`
  flex: 1;
  background-color: #eee;
`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Container>
      <WeatherView />
    </Container>
  );
};

export default App;
