import { useEffect, useState } from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";
import Alr from "./Alert/alr";


const AddEmployee = () => {
    const { pk, isedit } = useParams();
    const [empid, setEmpid] = useState('');
    const [empname, setName] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [status, setStatus] = useState('');
    const [editEmp, setEditEmp] = useState([]);

    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus, setAlrStatus] = useState();
    const [alrMessage, setAlrMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if(isedit === 'true'){
            fetchemployee();
        }
    }, [])

    useEffect(() => {
        if (isedit === 'true' && editEmp.length !== 0) {
            editEmp.map(obj => {
                setEmpid(obj.empid)
                setName(obj.name)
                setAge(obj.age)
                setGender(obj.gender)
                setStatus(obj.status)
            })
        }
    }, [editEmp])

    async function fetchemployee() {
        try {
            const { data, error } = await supabase
                .from('employees')
                .select("*")
                .eq('pk', pk)
            if (error) throw console.log(error);
            if (data !== null) {
                setEditEmp(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function insertemployee() {
        try {
            const { data, error } = await supabase
                .from('employees')
                .insert([
                    {
                        'empid': empid,
                        'name': empname,
                        'age': age,
                        'gender': gender,
                        'status': status
                    },
                ])
                .select()
                if(data!==null){
                    setAlrStatus(true);setAlrMessage("Insert Successfully");setdispAlr(true);
                }
                if(error){
                    setAlrStatus(false);setAlrMessage(error.details);setdispAlr(true);
                }
        } catch (error) {
            console.log(error);
        }
    }

    async function updatemployee() {
        try {
            const { data, error } = await supabase
                .from('employees')
                .update([
                    {
                        'empid': empid,
                        'name': empname,
                        'age': age,
                        'gender': gender,
                        'status': status
                    },
                ])
                .eq('pk',pk)
                .select()
                if(data!==null){
                    setAlrStatus(true);setAlrMessage("Insert Successfully");setdispAlr(true);
                }
                if(error){
                    setAlrStatus(false);setAlrMessage(error.details);setdispAlr(true);
                }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <Header /><br /><br /><br />
            <div className="row">

                <div className="col-lg-2">
                    <Sidenav currentbtn={'employee'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>

                    <button className="addbutton" onClick={() => { navigate('/employee') }}><ArrowBackIcon />&nbsp;Back to Employee</button>
                    <div style={{ padding: '1em' }}>
                        <div className="form">
                            <div className="formhead">
                                {isedit === 'true' ? "Edit Employee" : "Add Employee"}
                            </div>

                            <div className="formbody">

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="formlable">Employee Name</label>
                                        <input type="text" className="forminput"
                                            onChange={(e) => { setName(e.target.value) }} placeholder="Name"
                                            defaultValue={empname} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Employee ID</label>
                                        <input type="text" className="forminput"
                                            onChange={(e) => { setEmpid(e.target.value) }} placeholder="Uniqe ID"
                                            defaultValue={empid} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Age</label>
                                        <input type="number" min={0} className="forminput"
                                            onChange={(e) => { setAge(e.target.value) }} placeholder="Number"
                                            defaultValue={age} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Gender</label>
                                        <select type="text" className="forminput"
                                            onChange={(e) => { setGender(e.target.value) }}
                                            defaultValue={gender}
                                        >
                                            {isedit === 'true' &&
                                                <option value={gender} selected={true}>
                                                    {gender}
                                                </option>}
                                            <option value={''} selected={isedit ==='false' & true} disabled={true}>Choose</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                        </select>
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="formlable">Active Status</label>
                                        <select type="text" className="forminput"
                                            onChange={(e) => { setStatus(e.target.value) }} 
                                            defaultValue={status}>
                                            {isedit === 'true' ?
                                                <option value={status} selected={true}>
                                                    {status !==  '' && status !== null && status.toString()}
                                                </option>:
                                                <option value={''} selected={true} disabled={true}>
                                                    Choose
                                                </option>
                                            }
                                            <option value={true}>true</option>
                                            <option value={false}>false</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: '0 2em', float: 'right' }}>
                <button onClick={() => { 
                    isedit === 'true' ? updatemployee() : insertemployee() 
                    }} className="addbutton">
                    {isedit === 'false' ? 'Add Employee' : 'Update Employee'}
                </button>
            </div>
        </>
    );
}

export default AddEmployee;