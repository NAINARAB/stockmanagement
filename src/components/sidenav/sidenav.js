import { useNavigate } from "react-router-dom";
import './sidenav.css';
import { IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";


const Sidenav = ({ currentbtn }) => {
    const [opncond, setopencond] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className='menuhide'>
                {opncond === false ? <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold',zIndex:'4' }}
                    onClick={() => { document.getElementById('sid').style.display = 'block'; setopencond(true) }}
                ><MenuIcon /></IconButton> :

                    <IconButton size='small' sx={{ color: 'white', fontWeight: 'bold',zIndex:'4' }}
                        onClick={() => { document.getElementById('sid').style.display = 'none'; setopencond(false) }}
                    ><CloseIcon /></IconButton>}
            </div>

            <div  className='hideside' id="sid">
                <div className="side" style={{display:'flex', flexDirection:'column'}}>
                <button className={currentbtn === 'employee' ? 'blue' : null} 
                    onClick={() => { navigate('/employee') }}>Employees</button>

                <button className={currentbtn === 'asset' ? 'blue' : null} 
                    onClick={() => { navigate('/asset') }}>Asset</button>

                <button className={currentbtn === 'asset category' ? 'blue' : null} 
                    onClick={() => { navigate('/assettype')}}>Asset Category</button>
                
                <button className={currentbtn === 'issue asset' ? 'blue' : null} 
                    onClick={() => { navigate('/issueasset') }}>Issue Asset</button>

                <button className={currentbtn === 'return asset' ? 'blue' : null} 
                    onClick={() => { navigate('/returnasset')}}>Return Asset</button>
                {/* <button className={currentbtn === 'scrap asset' ? 'blue' : null} 
                    onClick={() => { }}>Scrap Asset</button> */}
                <button className={currentbtn === 'asset history' ? 'blue' : null} 
                    onClick={() => { navigate('/assethistory')}}>Asset history</button>
                </div>
            </div>
        </>
    );
}

export default Sidenav;