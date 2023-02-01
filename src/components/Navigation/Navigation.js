import React, { memo } from "react";

import './Navigation.css'
 

const Navigation = ({pages, set, current, reset}) => {

    
    const Pages = new Array(pages).fill(0);



    //method to handle the (CURRENT PAGE CHANGES)
    const handleSetCurrent = (e) => {
        const type = e.target.name;

        //resetting the profiles to undefined
        reset(undefined);

        switch(type) {
            case "prev":
                set(current-1);
                break;
            case "next":
                set(current+1);
                break;
            default:
                set(parseInt(type));
        }

    }


    return (
        <div className="navigation">
            <div className="navigation-items">
                <button name="prev" onClick={current===1 ? null : handleSetCurrent}><div className="prev"></div></button>
                    {
                        Pages.map((e, idx) => {
                                    return (<button name={idx+1} onClick={handleSetCurrent} key={idx+1} id={(idx+1)===current ? "active" : ""}>{idx+1}</button>)
                        })
                    }
                <button name="next" onClick={current===Pages.length ? null : handleSetCurrent}><div className="next"></div></button>
            </div>
        </div>
    );
}


export default memo(Navigation);