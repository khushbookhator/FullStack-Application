import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../Home/Navbar'

const Patient = () => {

    const {id} = useParams()
    const [pat, setPat] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:1105/api/patient/${id}`)
        .then((res) => setPat(res.data.data))
    },[])
    console.log(pat)


    return (
        <>
        <Navbar/>
        <br/><br/><br/>
        <div>
            <h1>{pat?.name}</h1>
            <p>Diagonaised By: Dr. {pat?.doctor?.last_name}</p>
            <h3>Medicine Ongoing:</h3>
            <table style={{
                border: '1px solid black',
                justifyContent: 'center',
                marginLeft: "43%",
                marginTop: '80px'
            }}>
                <thead>
                    <td>S.no</td>
                    <td>Name</td>
                    <td>Quantity</td>
                </thead>
                <tbody>

                {
                    pat.medicines?.map((item, i) => 
                    (
                        <tr>
                            <td>{i+1}</td>
                            <td>{item.medicines}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        </>
    )
}

export {Patient}
