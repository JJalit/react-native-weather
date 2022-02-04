import React from 'react';
import styled from 'styled-components/native';

import WeatherView from './Screens/WeatherView';
import WatchView from './Screens/WatchView';

const Container = styled.View`
  flex: 1;
  background-color: #eee;
`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Container>
      <WatchView />
    </Container>
  );
};

export default App;
