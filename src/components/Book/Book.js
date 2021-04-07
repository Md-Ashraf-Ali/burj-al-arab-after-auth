import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {UserContext} from '../../App';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        cheekIn: new Date(),
        cheekOut: new Date(),
    });

    const handleCheekInDate = (date) => {
        const newDates = {...selectedDate}
        newDates.cheekIn = date;
        setSelectedDate(newDates);
    };

    const handleCheekOutDate = (date) => {
        const newDates = {...selectedDate}
        newDates.cheekOut = date;
        setSelectedDate(newDates);
    };

    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch("http://localhost:5000/addBooking",{
            method:'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1> Hello, {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="cheek in date"
                    value={selectedDate.cheekIn}
                    onChange={handleCheekInDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="cheek out date "
                    format="dd/MM/yyyy"
                    value={selectedDate.cheekOut}
                    onChange={handleCheekOutDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    
                </Grid>
               < Button  onClick = "handleBooking" variant="contained" color="primary"> Book Now </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>

        </div>
    );
};

export default Book;