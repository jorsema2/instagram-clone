import React,{useState,useEffect,useReducer} from 'react'
import styled from 'styled-components';
import {toJson} from 'unsplash-js'
import {InfiniteGrid, GridHeader} from 'Components'
import unsplash from 'API/unsplash'
import GridReducer, { initialState } from 'Reducers/GridReducer'
import { reset, start } from 'Actions/InfiniteGridActions'

const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;

const UserHeader = ({user}) => {
    const statList = [
        `${user.total_likes} likes`,
        `${user.total_photos} photos`,
        `${user.followers_count} followers`
    ]
    return <GridHeader 
                src={user.profile_image.large} 
                title={user.name} 
                statList={statList}/>
}


export default function UserPage(props) {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useReducer(GridReducer, initialState);

    useEffect(() => {
        dispatch(reset);
        dispatch(start);
        unsplash.users
            .profile(props.match.params.username)
            .then(toJson)
            .then(json => {
                setUser(json);
            }).catch(()=>{
                setUser(null);
            });
    }, [props.match.params.username]);
    
    if(!user||user.errors) return null;
    return (
        <PageContainer>
            <UserHeader user={user}/>
            <InfiniteGrid
                state={state}
                dispatch={dispatch}
                query='users'
                type='photos'
                searchValue={user.username} />
        </PageContainer>
    )
}
