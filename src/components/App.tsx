import React from 'react';
import {Flower} from './Flower';

function App() {
    return (
        <div
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url("/bg.png")`
            }}>
            <Flower petal={10} r={400}/>
        </div>
    );
}

export default App;
