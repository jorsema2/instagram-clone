import styled,{css} from 'styled-components'
import Image from "react-graceful-image"

export const ModalContainer = styled.div`
    position:relative;
    width:750px;
    height:500px;
    max-height:80vh;
    max-width:80vw;
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    justify-content:space-around;
    align-items:center;
    border: 1px solid rgb(219,219,219);
    border-radius:5px;
    padding:30px;
`;

export const SearchInput = styled.input`
    line-height: 20px;
    text-align: center;
    outline: none;
    border: 1px solid rgb(219,219,219);
`;

export const Photo = styled(Image)`
    margin:10px;
    max-width:70%;
    max-height:70%;
    object-fit:scale-down;
`;

export const ButtonIcon = styled.button`
    outline:none;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    color:rgb(150,150,150);
    border: 2px solid rgb(219,219,219);
    background-color:white;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
        background-color:rgb(219,219,219,0.3);
    };
    &:active{
        cursor: pointer;
        background-color:rgb(219,219,219);
        color: white;
    };
`;

export const Card = styled.div`
    overflow: hidden;
    position: relative;
    text-align: center;
    margin: 10px auto;
    width: calc(296px * 0.9);
    height: 296px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media only screen and (max-width: 976px) {
        width: calc((100vw - 32px) / 3);
        height: calc((100vw - 32px) / 3);
    }
`;

export const cardCSS = css`
    width: 90%;
    height: 80%;
`;

export const CardBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    &:hover {
    opacity: 1;
    }
`;

export const HighlightMenuCard = styled.div`
    width: 296px;
    min-height: 60px;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    position: relative;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 976px) {
        width: 100%;
    }
`;

export const HighlightHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid rgb(219, 219, 219);
`;

export const HighlightPhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 976px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
`;
