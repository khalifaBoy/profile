import React, {useEffect, useState} from "react";
import axios from "axios";
import Profile from "../components/Profile/Profile";

import './Profiles.css'
import Navigation from "../components/Navigation/Navigation";

const Profiles = () => {
    const [profiles, setProfiles] = useState(undefined);
    const [curentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    
    useEffect(() => {
        //api endpoint
        const url = 'https://jsonplaceholder.typicode.com/users';
        //fetching data here
        const fetchData = async (URL) => {
            const response = await axios.get(URL);
            //set available pages
            setPages(Math.ceil(response.data.length/4));
        }

        //call to fetchData with url
        fetchData(url);

    }, [])
    

    //updating when the page changes
    useEffect(() => {
        //api endpoint
        const url = 'https://jsonplaceholder.typicode.com/users';
        //fetching data here
        const fetchData = async (URL) => {
            const response = await axios.get(URL);
            
            //set profiles for current page
            const start = (curentPage-1)*4, end = start+4;
            setProfiles(response.data.slice(start, end))
        }

        //call to fetchData with url
        fetchData(url);
    }, [curentPage])

    return (
        <div className="profiles">
            <div className="page">

                {   profiles 
                    // Profiles
                    ? profiles.map((e) => {
                        return (<Profile data={e} key={e.id} />)
                    }) 
                    // Loader
                    : <div className="loader">
                        <div className="red"></div> <div className="yellow"></div>
                      </div>
                }

                {/* Navigation */}
                <Navigation current={curentPage} set={setCurrentPage} pages={pages}/>
            </div>
        </div>
    );
}

export default Profiles;