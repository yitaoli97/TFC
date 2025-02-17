import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../contexts/TokenContext';

function CreateSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const [data, setData] = useState({})
    const { subsID } = useParams()
    const { token, setToken } = useContext(TokenContext)
 
    let page = null;

    useEffect(() => {
        if (subCxt.subid === undefined && token !== null) {
            fetch(`http://localhost:8000/payment/subscription/subscribe/`,
                {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({'data':{
                        "subscription_plan_id": `${subsID}`
                    }})
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Network response was not ok.');
                        return response.json();
                    }
                    })
                .then((data) => {
                    console.log(data);
                    setData(data);
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                })
        }}
    )
    
    if (token === null) {
        page = <>
            <h2>Please Login</h2>
            <Link to={"/login"} className='waves-effect waves-light btn'>Login</Link>
        </>
    } else
    if (subCxt.subid !== undefined) {
        console.log(subCxt)
        page = <>
         <div className="container">
                <h2> You Are Already Subscribed </h2>
                <Link to={"/subscription/plans/all"} className='waves-effect waves-light btn'>Change Your Subscription Plan</Link><br></br><br></br>
                <Link to={"/subscription/plans/current"} className='waves-effect waves-light btn'>View Your Subscription Plan</Link></div>
            </>
    } else if (data.success === undefined) {
        page = <>
         <div className="container">
            <h2>404 Not Found</h2>
            <p>There has been a problem with your fetch operation</p>
            <Link to={"/payment/cardinfo/update"} className='waves-effect waves-light btn'>Link New Card</Link>
            <br></br>
            <Link to={"/"} className='waves-effect waves-light btn'>Go to Home</Link></div>
        </>
    } else {
        subCxt.subid = subsID
        page = <>
         <div className="container">
            <h2> You Are Subscribed! </h2>
            <p> We are looking forward to seeing you in the studios 😊 </p>
            <div>
                <h3>Subscription Details</h3>
                <ul>
                    <li>Subscription plan: {data.name}</li>
                    <li>Payment has been successfully made to your credit card <em>{data.card_number}</em></li>
                    <li>Amount: ${data.price}</li>
                    <li>Your incoming payment will be at {data.next_payment.substring(0,10)}</li>
                </ul>
            </div>
            <Link to={"/"} className='waves-effect waves-light btn'>Go to Home</Link></div>
        </>
    }
    return (page)
}

export default CreateSubscription;