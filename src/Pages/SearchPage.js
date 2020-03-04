import React,{ useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { InfiniteGrid,GridHeader } from 'Components'
import GridReducer, { initialState } from 'Reducers/GridReducer'
import { reset, allowFetching, pauseFetching } from 'Actions/InfiniteGridActions'
import searchIcon from 'SVG/searchIcon.svg'

const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;

const SearchTypeList = styled.div`
    width: 100%;
    display:flex;
    justify-content:space-around;
`;


const SearchHeader = ({searchValue,searchType, total})=>{
    const title = `Search results for "${searchValue}"`;
    const statList = (total !== null)?[`${total} ${searchType} found`]:[];
    return <GridHeader src={searchIcon} title={title} statList={statList}/>
}

export default function SearchPage({history,match}) {
    const {searchValue,searchType} = match.params;
    const [photos, photosDispatch] = useReducer(GridReducer, initialState);
    const [collections, collectionsDispatch] = useReducer(GridReducer, initialState);

    const state = {photos,collections};
    const dispatch = {
        photos:photosDispatch,
        collections:collectionsDispatch
    };

    useEffect(() => {
        dispatch[searchType](allowFetching);
        return () => {
            photosDispatch(pauseFetching);
            collectionsDispatch(pauseFetching);
        };
    }, [searchType])

    useEffect(() => {
        photosDispatch(allowFetching);
        return ()=>{
            photosDispatch(reset);
            collectionsDispatch(reset);
        }
    }, [searchValue])

    const changeSearchType = searchType=>{
        history.push(`/search/${searchType}/${searchValue}`)
    }

    return (
        <PageContainer>
            <SearchHeader 
                searchValue={searchValue} 
                searchType={searchType}
                total={state[searchType].total}/>
            <SearchTypeList>
                <button onClick={()=>changeSearchType('photos')}>Search Photos</button>
                <button onClick={()=>changeSearchType('collections')}>Search Collections</button>
            </SearchTypeList>
            <InfiniteGrid
                state={state[searchType]}
                dispatch={dispatch[searchType]}
                query='search'
                searchType={searchType}
                searchValue={searchValue}/>
        </PageContainer>
    )
}
