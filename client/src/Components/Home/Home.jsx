import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import styled from "styled-components"
import axios from "axios"
import {Link} from "react-router-dom"


const Home = () => {
    const [patients, setPatients] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(0)
    useEffect(() => {
        axios.get(`http://localhost:1105/api/patient?page=${page}&size=${6}&asc=${sort}`)
        .then((res) => {
            console.log("agaim")
            setPatients(res.data.data.patient)
            setTotalPage(res.data.data.totalPages)
        })
        .catch((err) => console.log(err))
    },[page, sort])

    
    const [searchUser, setSearch] = useState([])
    const [query, setQuery] = useState("")


    const handleSearch = () => {
        axios.get(`http://localhost:1105/api/search?s=${query}`)
        .then((res) => setSearch(res.data.data))
        .catch((err) => console.log(err))
    }
    

    return (
        <>
        <Navbar handleSearch={handleSearch} query={query} setQuery={setQuery}/>
        <br/><br/><br/><br/>
        <Wrapper>

            <h3>List of Your Patients</h3>
            <Btns onClick={() => setSort(1)}>asc</Btns>
            <Btns onClick={() => setSort(-1)}>desc</Btns>
            {
                searchUser && searchUser.map((item) => 
                (
                    <Link to={item._id}>
                    <PatientsDetails key={item._id}>
                        
                        <img src={item.profile} alt=""/>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Age: {item.age}</p>
                            <p>Gender: {item.gender}</p>
                            <p>Diagonized by: </p>
                            <p>Medicine ongoing: {item.medicines.length}</p>
                        </div>
                    </PatientsDetails>
                    </Link>
                ))
            }
            {
                patients?.map((item) => 
                (
                    <Link to={item._id}>
                    <PatientsDetails key={item._id}>
                        
                        <img src={item.profile} alt=""/>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Age: {item.age}</p>
                            <p>Gender: {item.gender}</p>
                            <p>Diagonized by: </p>
                            <p>Medicine ongoing: {item.medicines.length}</p>
                        </div>
                    </PatientsDetails>
                    </Link>
                )
                )
            }
            <button disabled={page === 1} onClick={() => setPage(page - 1)} variant="contained" color="primary">
                    Prev
            </button>
            <h5 style={{ display: "inline", marginLeft: "20px", marginRight: "20px" }}>{page}</h5>
            <button disabled={page === totalPage} onClick={() => setPage(page + 1)} variant="contained" color="secondary">
                Next
            </button>
            <br/><br/>
        </Wrapper>
        </>
    )
}

export {Home}

const Wrapper = styled.div`
    width: 100%;
    h3{
        text-align: left;
    margin-left: 5%;
    }
    a{
        text-decoration: none;
        color: black;
    }
`

const PatientsDetails = styled.div`
    border: 1px solid lightgray;
    height: 160px;
    margin-left: 5%;
    width: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
        padding: 2%;
        width: 125px;
        height: 125px;
        border-radius: 50%;
    }
    div {
        padding: 2%;
        text-align: left;
        p{
            font-size: 14px;
        }
        
    }

`
const Btns = styled.button`
    background: #A3D5E9;
    outline: none;
    padding: 5px;
    border: none;
    margin: 5px;
    border-radius: 5px;
`