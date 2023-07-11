import React from "react";
import { useEffect, useState } from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";
import Alr from "./Alert/alr";

const AddAssetType = () => {
    const { pk, isedit } = useParams();
    const [assetCategory, setAssetCategory] = useState();

    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus, setAlrStatus] = useState(false);
    const [alrMessage, setAlrMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (isedit === 'true') {
            fetchassettype();
        }
    }, [])

    async function fetchassettype() {
        try {
            const { data, error } = await supabase
                .from('assetcategory')
                .select('*')
                .eq('pk', pk)
            if (error) throw console.log(error);
            if (data !== null) {
                data.map(obj => setAssetCategory(obj.type))
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function insertasset() {
        try {
            const { data, error } = await supabase
                .from('assetcategory')
                .insert([{
                    'type': assetCategory
                }])
                .select()
            if (error) {
                setAlrStatus(false); setAlrMessage(error.message); setdispAlr(true);
            }
            if (data !== null) {
                setAlrStatus(true); setAlrMessage("Insert Successfully"); setdispAlr(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function updatasset() {
        try {
            const { data, error } = await supabase
                .from('assetcategory')
                .update([{
                    'type': assetCategory
                }])
                .eq('pk', pk)
                .select()
            if (error) {
                setAlrStatus(false); setAlrMessage(error.message); setdispAlr(true);
            }
            if (data !== null) {
                setAlrStatus(true); setAlrMessage("Update Successful"); setdispAlr(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <Header /><br /><br /><br />
            <div className="row">
                <div className="col-lg-2">
                    <Sidenav currentbtn={'asset category'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>
                    <button className="addbutton" onClick={() => { navigate('/assettype') }}>
                        <ArrowBackIcon />&nbsp;Back to Asset Category
                    </button>

                    <div style={{ padding: '1em' }}>
                        <div className="form">
                            <div className="formhead">
                                {isedit === 'true' ? "Edit Asset Category" : "Add Asset Category"}
                            </div>

                            <div className="formbody">
                                <div className="col-lg-4">
                                    <label className="formlable">Asset Category</label>
                                    <input type="text" className="forminput"
                                        onChange={(e) => { setAssetCategory(e.target.value) }}
                                        placeholder="Category"
                                        defaultValue={assetCategory} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '0 2em', float: 'right' }}>
                        <button onClick={() => {
                            isedit === 'true' ? updatasset() : insertasset()
                        }} className="addbutton">
                            {isedit === 'false' ? 'Add Asset Category' : 'Update Asset Category'}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddAssetType;