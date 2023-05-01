import React from 'react'

const Button = ({ text, onClick, type, can }) => {


    const color = type == 1 ? can ? 'green' : 'grey' : can ? 'red' : "grey"

    return (
        <button style={{
            width: 200, height: 100, borderRadius: 30,
            backgroundColor: color,
            margin: 5

        }}
            disabled={!can}
            onClick={onClick}
        > <h1>{text}</h1></ button >

    )
}

export default Button