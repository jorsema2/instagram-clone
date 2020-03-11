import React, { useState,useEffect,useReducer } from "react";
import { 
  Card, 
  CardLoader, 
  InfiniteLoader,
  CustomModal,
  Showcase
} from "Components";
import {InfiniteContainer} from './InfiniteLoader.styles'
import InfiniteLoaderReducer, { initialState } from 'Reducers/InfiniteLoaderReducer'
import { allowFetching } from 'Actions/InfiniteLoaderActions';


export default function LatestPhotos({setModalIsOpen,setModalScreen}) {
  const [state, dispatch] = useReducer(InfiniteLoaderReducer, initialState);
  const {dataList:photoList} = state;

  useEffect(() => {
    dispatch(allowFetching);
  }, [])

  const closeModal = ()=>setModalIsOpen(false);
  const startShowcase = (startIndex=0)=>{
    const modalScreen = (
      <Showcase 
        photoList={photoList} 
        initialSlide={startIndex}
        closeModal={closeModal}/>)
    setModalScreen(modalScreen);
    setModalIsOpen(true);
  }

  return (
    <InfiniteLoader
      query='photos'
      searchType='listPhotos'
      state={state}
      dispatch={dispatch}
      loader={<CardLoader key='loading'/>}>
      <InfiniteContainer>
        {photoList.map((photo,i)=>{
          return (
            <Card 
              key={photo.id} 
              photo={photo}
              onClick={()=>startShowcase(i-1)}/>)
        })}
      </InfiniteContainer>
    </InfiniteLoader>
  );
}