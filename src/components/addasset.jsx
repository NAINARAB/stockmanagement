import { useEffect, useState } from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";
import Alr from "./Alert/alr";
import { Chip } from "@mui/material";


const AddAsset = () => {
    const { pk, isedit } = useParams();

    const [assetname, setAssetname] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [pricevalue, setPriceValue] = useState();
    const [quantity, setQuantity] = useState();
    const [obsolete, setObsolete] = useState(false);
    const [hardware, setHardware] = useState();
    const [hardwareArray, setHardwareArray] = useState([]);
    const [assetEdit, setAssetEdit] = useState([]);
    const [category, setCategory] = useState();
    const [categoryget, setCategoryGet] = useState();
    const [categoryArray, setCategoryArray] = useState([]);

    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus, setAlrStatus] = useState(false);
    const [alrMessage, setAlrMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (isedit === 'true') {
            fetchasset();
        }
        fetchtype()
    }, [])

    useEffect(() => {
        if (isedit === 'true' && assetEdit.length !== 0) {
            assetEdit.map(obj => {
                setAssetname(obj.asset_name)
                setSerialNo(obj.serialno)
                setPriceValue(obj.price_value)
                setHardwareArray(obj.hardware)
                setObsolete(obj.obsolete)
                setCategory(obj.type)
                setCategoryGet(obj.getcategory.type)
                setQuantity(obj.quantity)
            })
        }
    }, [assetEdit])

    async function fetchtype() {
        try {
            const { data, error } = await supabase
                .from('assetcategory')
                .select('*')
            if (error) throw console.log(error)
            if (data !== null) {
                setCategoryArray(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchasset() {
        try {
            const { data, error } = await supabase
                .from('asset')
                .select(`*
                , getcategory : type (type)`)
                .eq('pk', pk)
            if (error) throw console.log(error);
            if (data !== null) {
                setAssetEdit(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function insertasset() {
        try {
            const { data, error } = await supabase
                .from('asset')
                .insert([{
                    'asset_name': assetname,
                    'price_value': pricevalue,
                    'serialno': serialNo,
                    'type': category,
                    'quantity': quantity,
                    'hardware': hardwareArray
                }])
                .select()
            if (error) {
                console.log(error)
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
                .from('asset')
                .update([{
                    'asset_name': assetname,
                    'price_value': pricevalue,
                    'serialno': serialNo,
                    'type': category,
                    'quantity': quantity,
                    'hardware': hardwareArray,
                    'obsolete': obsolete
                }])
                .eq('pk', pk)
                .select()
            if (error) {
                console.log(error)
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
        <>
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <Header /><br /><br /><br />
            <div className="row">

                <div className="col-lg-2">
                    <Sidenav currentbtn={'asset'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>

                    <button className="addbutton" onClick={() => { navigate('/asset') }}>
                        <ArrowBackIcon />&nbsp;Back to Asset
                    </button>
                    <div style={{ padding: '1em' }}>
                        <div className="form">
                            <div className="formhead">
                                {isedit === 'true' ? "Edit Asset" : "Add Asset"}
                            </div>

                            <div className="formbody">

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="formlable">Asset Name</label>
                                        <input type="text" className="forminput"
                                            onChange={(e) => { setAssetname(e.target.value) }} placeholder="Name"
                                            defaultValue={assetname} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Price Value</label>
                                        <input type="number" className="forminput"
                                            onChange={(e) => { setPriceValue(e.target.value) }} placeholder="Amount"
                                            defaultValue={pricevalue} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Serial No</label>
                                        <input type="text" className="forminput"
                                            onChange={(e) => { setSerialNo(e.target.value) }} placeholder="Uniqe Code"
                                            defaultValue={serialNo} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Quantity</label>
                                        <input type="number" min={0} className="forminput"
                                            onChange={(e) => { setQuantity(e.target.value) }} placeholder="Quantity in Number"
                                            defaultValue={quantity} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Asset Category</label>
                                        <select className="forminput" onChange={(e) => { setCategory(e.target.value) }}>
                                            {isedit == 'true' ?
                                                <option value={category} selected={true}>
                                                    {categoryget}
                                                </option>
                                                :
                                                <option value={''} selected={true} disabled={true}>
                                                    Choose
                                                </option>
                                            }
                                            {categoryArray.map(obj => (<option value={obj.pk}>{obj.type}</option>))}
                                        </select>
                                    </div>

                                    {isedit === 'true' ?
                                        <div className="col-lg-4">
                                            <label className="formlable">Obsolete Status</label>
                                            <select className="forminput"
                                                onChange={(e) => { setObsolete(e.target.value) }}>
                                                {isedit == 'true' ?
                                                    <option value={obsolete} selected={true}>
                                                        {obsolete !== null ? obsolete.toString() : null}
                                                    </option>
                                                    :
                                                    <option value={''} selected={true} disabled={true}>
                                                        Choose
                                                    </option>
                                                }
                                                <option value={true}>true</option>
                                                <option value={false}>false</option>
                                            </select>
                                        </div>:<div className="col-lg-4"></div>}

                                    <div className="col-lg-4">
                                        <label className="formlable">Hardware Used</label>
                                        <input type="text" className="forminput"
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                setHardware(value);
                                            }}
                                            value={hardware}
                                        />
                                        <button className="addbutton" onClick={(e) => {
                                            if (hardware !== '') {
                                                e.preventDefault();
                                                setHardwareArray([...hardwareArray, hardware]);
                                                setHardware('');
                                            }
                                        }} style={{ margin: '1em' }}>
                                            Add &nbsp; <ArrowForwardIcon />
                                        </button>
                                    </div>

                                    <div className="col-lg-6">
                                        <label className="formlable">Hardware Entered</label>
                                        <div className="arraybox">
                                            {hardwareArray.map((arob, index) => {
                                                return (
                                                    <>
                                                        <Chip label={arob} sx={{ margin: '2px' }} onDelete={
                                                            () => {
                                                                setHardwareArray(hardwareArray.filter(item => item !== arob));
                                                            }
                                                        } />
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: '0 2em', float: 'right' }}>
                <button onClick={() => {
                    isedit === 'true' ? updatasset() : insertasset()
                }} className="addbutton">
                    {isedit === 'false' ? 'Add Asset' : 'Update Asset'}
                </button>
            </div>
        </>
    );
}

export default AddAsset;