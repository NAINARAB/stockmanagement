import React from "react";
import Sidenav from "./sidenav/sidenav";
import Header from "./header/header";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Tbl from "./table/table";
import SearchIcon from '@mui/icons-material/Search';
import './main.css';

const AssetHistory = () => {
    const [asset, setAsset] = useState([]);
    const [searchdata, setSearchdata] = useState('');
    useEffect(() => {
        fetchasset();
    }, [])

    async function fetchasset() {
        try {
            const { data, error } = await supabase
                .from('asset_issue_history')
                .select(`*
                ,employeename: employeepk (*)
                ,assetname: assetpk (*)`)
            if (error) throw console.log(error);
            if (data !== null) {
                data.sort((a, b) => { return a.assetname.pk - b.assetname.pk });
                setAsset(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <Header /><br /><br /><br />
            <div className="row">
                <div className="col-lg-2">
                    <Sidenav currentbtn={'asset history'} />
                </div>

                <div className="col-lg-10">
                    <div className="container" style={{ padding: '1em' }}>
                        {asset.map(obj => (
                            <div className="form" style={{ margin: '1em' }}>
                                <h4 className="formhead">Issued Asset : {obj.assetname.asset_name} &emsp; Issued To : {obj.employeename.name}</h4>
                                <div className="row formbody">
                                    <div className="col-lg-6">
                                        <p className="card-text">Asset Issued At :&emsp; {obj.created_at}</p>
                                        <p className="card-text">Issued Status(Now?) :&emsp; {obj.issued_status !== null ? obj.issued_status.toString() : "Null"}</p>
                                        <p className="card-text">Returned Date :&emsp; {obj.return_time !== null ? obj.return_time : "Null"}</p>
                                        <p className="card-text">Returned Reason :&emsp; {obj.return_message !== null ? obj.return_message : "Null"}</p>
                                        <p className="card-text">Employee ID :&emsp; {obj.employeename.empid}</p>
                                    </div>
                                    <div className="col-lg-6">
                                        <p className="card-text">Asset Serialno:&emsp; {obj.assetname.serialno}</p>
                                        <p className="card-text">Is Obsolete ?:&emsp; {obj.assetname.obsolete !== null ? obj.assetname.obsolete.toString() : "Null"}</p>
                                        <p className="card-text">Asset Price :&emsp; {obj.assetname.price_value}</p>
                                        <p className="card-text">Total Quantity    :&emsp; {obj.assetname.quantity}</p>
                                        <p className="card-text">Issued Quantity    :&emsp; {obj.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default AssetHistory;