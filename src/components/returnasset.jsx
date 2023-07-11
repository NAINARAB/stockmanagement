import React from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import Alr from "./Alert/alr";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ReturnAsset = () => {
    const [assetHistory, setAssetHistory] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [pk, setPk] = useState();
    const [assetpk,setasseetpk] = useState();
    const [quantity, setQuantity] = useState();
    const [stockcount, setstockcount] = useState();
    const [fet,setFet] = useState(false)

    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus, setAlrStatus] = useState();
    const [alrMessage, setAlrMessage] = useState('');

    useEffect(() => {
        fetchhistory();
    }, [fet])

    async function fetchhistory() {
        try {
            const { data, error } = await supabase
                .from('asset_issue_history')
                .select(`*
                    ,employeename: employeepk (*)
                    ,assetname: assetpk (*)`)
                .eq('issued_status', true)
            if (error) throw console.log(error)
            if (data !== null) {
                setAssetHistory(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const currentDate = new Date();


    async function returnasset() {
        try {
            const { data, error } = await supabase
                .from('asset_issue_history')
                .update([{
                    'issued_status': false,
                    'return_message': message,
                    'return_time': currentDate
                }])
                .eq('pk', pk)
                .select()
                if(error){setAlrStatus(false); setAlrMessage(error.message); setdispAlr(true)}

                if(data!==null){
                    const {data,error} = await supabase
                    .from('asset')
                    .update([{
                        'stock': stockcount + quantity
                    }])
                    .eq('pk',assetpk)
                    if(error) {
                        setAlrStatus(false); 
                        setAlrMessage(error.message); 
                        setdispAlr(true);
                        setOpen(false)
                        setFet(!fet)
                    }
                    if(data!== null){
                        setAlrStatus(true); setAlrMessage("Asset Returned"); setdispAlr(true);
                    }
                }
        } catch (e) {
            console.log(e);
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <Header /><br /><br /><br />
            <div className="row">
                <div className="col-lg-2">
                    <Sidenav currentbtn={'return asset'} />
                </div>
                <div className="col-lg-10" style={{ padding: '1em' }}>
                    <div className="container">
                        <div className="row">
                            {assetHistory.map(obj => (
                                <div className="col-lg-4">
                                    <div className="form">
                                        <h4 className="formhead">Issued To :&emsp; {obj.employeename.name}</h4>
                                        <div className="formbody">
                                            <p className="card-text">Employee ID :&emsp; {obj.employeename.empid}</p>
                                            <p className="card-text">Issued Asset:&emsp; {obj.assetname.asset_name}</p>
                                            <p className="card-text">Asset Serialno:&emsp; {obj.assetname.serialno}</p>
                                            <p className="card-text">Asset Price :&emsp; {obj.assetname.price_value}</p>
                                            <p className="card-text">Quantity    :&emsp; {obj.quantity}</p>
                                            <button className="addbutton"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setPk(obj.pk);
                                                    setasseetpk(obj.assetname.pk)
                                                    setQuantity(obj.quantity)
                                                    setstockcount(obj.assetname.stock)
                                                }}>Return Asset</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b style={{ color: 'black', padding: '0px 20px' }}>Type Reason</b>
                        </DialogContentText>
                        <input type="text" className="forminput" onChange={(e)=>{setMessage(e.target.value)}} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {returnasset()}} autoFocus sx={{ color: 'red' }}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}

export default ReturnAsset;