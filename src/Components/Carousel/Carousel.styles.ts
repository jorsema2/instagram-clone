import styled from "styled-components";

export const Container = styled.div<{ containerCSS: any }>`
  ${props => props.containerCSS};
`;

export const Item = styled.div<{ height: any; width:any }>`
  ${props => `
    height:${props.height}px;
    width:${props.width+1}px
  `}
  display:flex !important;
  justify-content: center;
  align-items: center;
`;

