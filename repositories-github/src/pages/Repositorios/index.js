import React from 'react';

export default function Repositorios({match}) {
    return ( 
    <h1 style={{color:'#FFF'}}>
        
        {decodeURIComponent(match.params.repositorios)}
        </h1>
    )
}