import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Home from '../Home/Home';

const CheckUser = ({ children }) => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setFlag(true)
            }
        });
    })

    if (flag) {
        return <Home></Home>
    }
    else {
        return children;
    }


};

export default CheckUser;