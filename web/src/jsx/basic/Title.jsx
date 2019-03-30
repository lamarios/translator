import React from 'react';
import styled from 'styled-components';


const H1 = styled.h1`
  padding:0;
  margin:0px 0px 10px 0px;
  font-weight: normal;
  color: ${props => props.theme.colors.primary.main};
`;

export default class Title extends React.Component {

    render() {
        return (<H1 {...this.props}>{this.props.children}</H1>)
    }

}
