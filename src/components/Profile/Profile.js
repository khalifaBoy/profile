import React, { memo, useState } from "react";

import './Profile.css'



const ProfileItem = memo(({ id, type, value}) => {
    return (
        <div id={id}>
          <label htmlFor={`item-${type}-name`}>{type}</label>
          <h1 name={`item-${type}-name`}>{value}</h1>
        </div>
      );
});


const Button = memo(({classname, style, click, tell}) => <button className={classname} style={style} onClick={click}>{tell ? "hide" : "view"} details</button>)




const Profile = ({data}) => {
    const [isDetailed, change] = useState(false);
    const address = (data.address.street + ", " + data.address.suit + ", " + data.address.zipcode);
    //To control the view of a profile
    const handleClick = () => change(!isDetailed)


    return (
        <div className='profile'>
            {/* Initial View */}
        <div className="summary">
            <h1 style={{marginLeft:"3vw"}}>{data.company.name}</h1>
            <ProfileItem type="contact" value={data.name}/>
            <ProfileItem type="city" value={data.address.city}/>
            <ProfileItem type="state" value={data.address.city}/>
            <Button classname="btn" style={{marginRight:"1vw"}} click={handleClick} tell={isDetailed} />
        </div>
            {/* Detailed View */}
        {isDetailed && <div className="detailed">
            <div className="container">
                <ProfileItem id="description" type="description" value={data.name}/>
                <ProfileItem id="contact" type="contact-person" value={data.name}/> <ProfileItem id="address" type="address" value={address}/>
                <ProfileItem id="designation" type="designation" value={data.name}/> <ProfileItem id="city" type="city" value={data.address.city}/>
                <ProfileItem id="emails" type="emails" value={data.email}/> <ProfileItem id="state" type="state" value={data.address.city}/>
                <ProfileItem id="phones" type="phones" value={data.phone}/> <ProfileItem id="country" type="country" value={data.address.city}/>
            </div>
        </div>}

        </div>
    );
}



export default memo(Profile);