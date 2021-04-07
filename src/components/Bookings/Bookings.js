import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings , setBookings] = useState([]);
    const [loggedInUser, setloggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization :`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data) );



    }, [] )

    return (
        <div>
            <h3>you have : {bookings.length} bookings</h3>

            {
                bookings.map(book =>  <li>{book.name} from : { (new Date (book.CheckIn) .toDateString('dd/MM/yyyy'))} to : {(new Date (book.CheckOut) .toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;