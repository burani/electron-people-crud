import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { CustomToolbar } from './common/CustomToolbar';

export const About: React.FC = () => {
  return (
    <Container>
      <CustomToolbar />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Тестовое задание
      </Typography>
    </Container>
  );
};
