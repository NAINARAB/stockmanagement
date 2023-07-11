import AddIcon from '@mui/icons-material/Add';
import Sidenav from "./sidenav/sidenav";
import Header from "./header/header";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import './main.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import Tbl from "./table/table";



const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchdata, setSearchdata] = useState('');
    const [fet,setFet] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchemployee();
    }, [fet])

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

    const refresh = () => setFet(!fet);
    const tableheaddata = [
        {
            'headname': 'SNo',
            'variant': 'head',
            'align': 'left',
            'width': 100
        },
        {
            'headname': 'Employee ID',
            'align': 'left',
        },
        {
            'headname': 'Empolyee Name',
            'align': 'left',
        },
        {
            'headname': 'Age',
            'align': 'left',
        },
        {
            'headname': 'Gender',
            'align': 'left',
        },
        {
            'headname': 'Active Status',
            'align': 'left',
        },
        {
            'headname': 'Action',
            'align': 'right',
        }
    ]
    const tablebodycolumn = ['empid', 'name', 'age', 'gender', 'status']

    return (
        <>
            <Header /><br /><br /><br />
            <div className="row">

                <div className="col-lg-2">
                    <Sidenav currentbtn={'employee'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>

                    <button className="addbutton" onClick={() => { navigate(`/addemployee/${0}/${'false'}`) }}>
                        <AddIcon />&nbsp;Add Employee
                    </button>

                    <div className="search" style={{ marginBottom: 'unset' }}>
                        <input type={'search'} className='micardinpt'
                            placeholder="Search any data...."
                            onChange={(e) => {
                                setSearchdata((e.target.value).toLowerCase());
                            }} style={{ paddingLeft: '3em' }} />
                        <div className="sIcon">
                            <SearchIcon sx={{ fontSize: '2em' }} />
                        </div>
                    </div>

                    {employees.length !== 0 ?
                        <Tbl
                        tableheaddata={tableheaddata}
                        search={searchdata}
                        tablebodydata={employees}
                        tablebodycolumn={tablebodycolumn}
                        table={'employees'}
                        addscrn={'addemployee'}
                        refresh={refresh}
                        />
                        :
                        <h1><br /><br />Waiting for data</h1>
                    }
                </div>
            </div>
        </>
    );
}

export default Employees;