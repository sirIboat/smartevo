import { useState } from 'react';

function useSerial() {

    function getSerial() {
        const userString = localStorage.getItem('serialnumber');
        const user = JSON.parse(userString);
        // console.log(user);
        return user
    }
    const [serial, setSerial] = useState(getSerial());

    const saveSerial = useSerial => {
        localStorage.setItem('serialnumber', JSON.stringify(useSerial));
        setSerial(useSerial);
    };

    const clearSerial = () => {
        localStorage.removeItem('serialnumber');
        setSerial("");
    };

    return {
        clearSerial, clearSerial,
        setSerial: saveSerial,
        serial
    }
}


export default useSerial;