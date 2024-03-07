import React from "react";

// The component
export class BasketBall extends React.Component {

    // The HTML Markup
    // Notice how we use className instead of class; this is important!
    // read this: https://reactjs.org/docs/dom-elements.html
    render() {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-naplesYellow text-5xl font-bold">BASKETBALL</h1>
                </div>
            </div>
        )
    }
}