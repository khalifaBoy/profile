import React, {useEffect, useState} from "react";
import axios from "axios";
import Profile from "../components/Profile/Profile";

import './Profiles.css'
import Navigation from "../components/Navigation/Navigation";

const Profiles = () => {

    //state chunks for current ( PROFILES, PAGE and NUMBER OF PAGES)
    const [profiles, setProfiles] = useState(undefined);
    const [curentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    

    //updating when the current page changes
    useEffect(() => {
        //api endpoint
        const url = 'https://jsonplaceholder.typicode.com/users';

        //fetching data here
        const fetchData = async (URL) => {
            const response = await axios.get(URL);

            //Setting number of available pages on each update
            setPages(Math.ceil(response.data.length/4));
            
            //Setting profiles for current page
            const start = (curentPage-1)*4, end = start+4;
            setProfiles(response.data.slice(start, end))
        }

        //call to fetchData with url
        fetchData(url);
    }, [curentPage])


    const setPage = (page) => {
        setProfiles(undefined);
        setCurrentPage(page);
    }

    return (
        <div className="profiles">
            <div className="page">

                {   profiles 
                    // Profiles for current page
                    ? profiles.map((e) => {
                        return (<Profile data={e} key={e.id} />)
                    }) 
                    // Loader when profiles are undefined
                    : <div className="loader">
                        <div className="red"></div> <div className="yellow"></div>
                      </div>
                }

                {/* Navigation */}
                <Navigation current={curentPage} set={setPage} pages={pages} reset={setProfiles}/>
            </div>
        </div>
    );
}

export default Profiles;