import React from "react";
import { SpinnerDotted } from 'spinners-react';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transfrom: 'translate(-50%, -50%)',
    backgroundColor: 'lightgrey',
    width: '130px',
    padding: '20px',
    border: '1px solid grey',
    borderRadius: '10px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}


const Spinners = ( {spinner} ) => {

    if (!spinner) return;

    return <div style={styles}>
        <SpinnerDotted size={90} thickness={100} speed={138} color="#36ad47" />
        <p style={{color: '#3e3d3d', letterSpacing: '1px'}}>Please wait</p>
    </div>
}

export default Spinners;
