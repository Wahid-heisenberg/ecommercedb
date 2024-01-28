import React from 'react'
import services from '../assets/services.png'
import costumer from  '../assets/costumer.png'
import guarantie from  '../assets/guarantie.png'

function Offers() {

    const Offers = [
        {
            logo: services,
            title: "FREE AND FAST DELIVERY",
            description: "Free delivery for all orders over $140",
        },
        {
            logo: costumer,
            title: "24/7 CUSTOMER SERVICE",
            description: "Friendly 24/7 customer support",
        },
        {
            logo: guarantie,
            title: "MONEY BACK GUARANTEE",
            description: "We return money within 30 days",
        },
    ];

    return (
        <div className='flex flex-row items-center justify-around text-center my-8'>
            {Offers.map((offer, index) => (
                <div key={index} className='flex flex-col items-center p-3'>
                    <img src={offer.logo} alt={offer.title} />
                    <h3 className='text-xl font-bold '>{offer.title}</h3>
                    <p>{offer.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Offers