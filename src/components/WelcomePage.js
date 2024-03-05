import React from "react";

import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketball } from '@fortawesome/free-solid-svg-icons'


// The component
export class Welcome extends React.Component {
    // The JavaScript Logic
    constructor(props) {
        super(props)
    }

    // The HTML Markup
    // Notice how we use className instead of class; this is important!
    // read this: https://reactjs.org/docs/dom-elements.html
    render() {
        return ( 
            <div>
                    <h1 className="naples-yellow"> MIMIR </h1>
                    <FontAwesomeIcon className="naples-yellow" icon={faBasketball} />           
            </div>
        )
    }
}
