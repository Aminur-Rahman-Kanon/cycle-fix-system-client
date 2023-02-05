import React from "react";

const styles = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: '#0000004a'
}

const backdrop = (props) => {

    return <div style={ props.backdrop ? styles : {display: 'none'}}>

    </div>
}

export default backdrop;
