import React from "react";
import Sidenav from "./sidenav/sidenav";
import Header from "./header/header";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Tbl from "./table/table";
import './main.css';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const AssetType = () => {
    const [assetData, setAssetData] = useState([]);
    const [searchdata, setSearchdata] = useState('');
    const [fet, setFet] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchasset();
    }, [fet])

    const refresh = () => setFet(!fet);

    async function fetchasset() {
        try {
            const { data, error } = await supabase
                .from('assetcategory')
                .select('*')
            if (error) throw console.log(error);
            if (data !== null) {
                setAssetData(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const tableheaddata = [
        {
            'headname': 'SNo',
            'variant': 'head',
            'align': 'left',
            'width': 100
        },
        {
            'headname': 'Asset Type',
            'align': 'left',
            'width': 200
        },
        {
            'headname': 'Action',
            'align': 'right',
        },
    ]
    const tablebodycolumn = ['type'];

    return (
        <React.Fragment>
            <Header /><br /><br /><br />
            <div className="row">

                <div className="col-lg-2">
                    <Sidenav currentbtn={'asset category'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>
                    <button className="addbutton" onClick={() => { navigate(`/addassettype/${0}/${'false'}`) }}>
                        <AddIcon />&nbsp;Add Asset Type
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

                    {assetData.length !== 0 ?
                        <Tbl
                            tableheaddata={tableheaddata}
                            search={searchdata}
                            tablebodydata={assetData}
                            tablebodycolumn={tablebodycolumn}
                            table={'assetcategory'}
                            addscrn={'addassettype'}
                            refresh={refresh}
                        />
                        :
                        <h1><br /><br />Waiting for data</h1>
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

export default AssetType;