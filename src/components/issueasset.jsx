import React from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import Alr from "./Alert/alr";

const IssueAsset = () => {
    const [employees, setEmployees] = useState([]);
    const [asset, setAsset] = useState([]);
    const [assetPK, setAssetPK] = useState();
    const [employeePK, setEmployeePK] = useState();
    const [quantity, setQuantity] = useState();

    const [stock, setStock] = useState();

    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus, setAlrStatus] = useState();
    const [alrMessage, setAlrMessage] = useState('');

    useEffect(() => {
        fetchemployee();
        fetchasset();
    }, [])

    useEffect(() => {
        if (stock !== null) {
            fetchassetstock();
        }
    }, [assetPK])

    async function fetchassetstock() {
        try {
            const { data, error } = await supabase
                .from('asset')
                .select('stock')
                .eq('obsolete', false)
                .eq('pk', assetPK)
            if (error) throw console.log(error);
            if (data !== null) {
                setStock(data.map(obj => obj.stock));
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchemployee() {
        try {
            const { data, error } = await supabase
                .from('employees')
                .select("*")
            if (error) throw console.log(error);
            if (data !== null) {
                setEmployees(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchasset() {
        try {
            const { data, error } = await supabase
                .from('asset')
                .select('*')
                .eq('obsolete', false)
            if (error) throw console.log(error);
            if (data !== null) {
                setAsset(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function doissue() {
        if (stock >= quantity) {
            try {
                const { data, error } = await supabase
                    .from('asset_issue_history')
                    .insert([{
                        employeepk: employeePK,
                        assetpk: assetPK,
                        issued_status: true,
                        quantity: quantity,
                    }])
                    .select()
                if (error) {
                    setAlrStatus(false); setAlrMessage(error.message + error.details); setdispAlr(true);
                }
                if (data !== null) {
                    const { data, error } = await supabase
                        .from('asset')
                        .update([{
                            stock: (stock - quantity)
                        }])
                        .eq('pk', assetPK)
                        .select()
                    if (error) {
                        setAlrStatus(false); setAlrMessage(error.message); setdispAlr(true);
                    }
                    if (data !== null) {
                        setAlrStatus(true); setAlrMessage("Issued Successfully"); setdispAlr(true);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }else{
            setAlrStatus(false); setAlrMessage("Not Enough Stock"); setdispAlr(true);
        }
    }

    return (
        <React.Fragment>
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <Header /><br /><br /><br />
            <div className="row">
                <div className="col-lg-2">
                    <Sidenav currentbtn={'issue asset'} />
                </div>
                <div className="col-lg-10" style={{ padding: '1em' }}>
                    <div className="form">
                        <div className="formhead">
                            <h3>Issue Asset</h3>
                        </div>
                        <div className="formbody">
                            <div className="row">

                                <div className="col-lg-4">
                                    <label className="formlable">Asset Name</label>
                                    <select className="forminput"
                                        onChange={(e) => { setAssetPK(e.target.value) }}>
                                        <option value={''} selected={true} disabled={true}>
                                            Choose
                                        </option>
                                        {asset.map(obj => (<option value={obj.pk}>{obj.asset_name}</option>))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="formlable">Employee Name</label>
                                    <select className="forminput"
                                        onChange={(e) => { setEmployeePK(e.target.value) }}>
                                        <option value={''} selected={true} disabled={true}>
                                            Choose
                                        </option>
                                        {employees.map(obj => (<option value={obj.pk}>{obj.name}</option>))}
                                    </select>
                                </div>

                                <div className="col-lg-4">
                                    <label className="formlable">Stock Available</label>
                                    <input disabled={true}
                                        className="forminput"
                                        value={stock} />
                                </div>

                                <div className="col-lg-4">
                                    <label className="formlable">Issue Quantity</label>
                                    <input type="number"
                                        className="forminput"
                                        min={1}
                                        max={stock}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                        placeholder={`1 to ${stock}`} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: '0 2em', float: 'right' }}>
                <button onClick={() => { doissue() }} className="addbutton">
                    Issue Asset
                </button>
            </div>
        </React.Fragment>
    );
}

export default IssueAsset;