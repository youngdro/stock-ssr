import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 16px;
`;

const LogoBox = styled.div`
    height: 48px;
    background-color: #fff;
    background-image: url(/logo.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default () => {
    return (
        <Container>
            <LogoBox />
        </Container>
    );
}