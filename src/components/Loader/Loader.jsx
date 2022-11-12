import React from 'react'
import { Ring } from '@uiball/loaders'


function Loader({size=40, speed=2, color="black"}) {
    return (
        <Ring
            size={size}
            lineWeight={5}
            speed={speed}
            color={color}
        />
    )
}

export default Loader


