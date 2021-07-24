import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { loadData } from '../../Utils/localStorage'
import axios from "axios"

const Navbar = ({handleSearch, query, setQuery}) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        let d = loadData('user')
        setUser(d)
    },[])

    

    return (
        <Wrapper>
            <Container>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwkgpuEBAUUna8SVrHAZ9sDFRkMz_B2SekyEkBKtCXL614UtngfutsuZKNkx6Xy-1GeM&usqp=CAU" alt=""/>
                <div>
                <input
                placeholder="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}> Search </button>
                </div>
                <h4>{`${user?.first_name}. ${user?.last_name}`}</h4>
                <button>Logout</button>
            </Container>
        </Wrapper>
    )
}

export {Navbar}
const Wrapper = styled.div`
    width: 100%;
    background: #A3D5E9;
    height: 60px;
    position: fixed;
`
const Container = styled.div`
    width: 70%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    img {
        background: transparent;
        border-radius: 50%;
    }
    div{
        display: flex;
        width:50%;
    }
    input {
        width: 100%;
        height: 30px;
        margin: auto 0px;
        padding: 5px;
        font-size:15px;
        font-weight:600;
        background-color: white;
        border: none;
        outline: none;
    }
    button {
        margin-left: 0px;
        height: 42px;
        margin: auto 0px;
        padding: 0px 5px;
        background-color: white;
        border: 1px solid lightgray;
        cursor: pointer;
    }
    h4{
        margin-top: 15px;
    }

`