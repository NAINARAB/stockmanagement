import Sidenav from "./sidenav/sidenav";
import Header from "./header/header";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Tbl from "./table/table";
import './main.css';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


const Asset = () => {
    const [asset, setAsset] = useState([]);
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
                .from('asset')
                .select(`
            *,
             assettype: type (type)`
                )
                .eq('obsolete',false)
            if (error) throw console.log(error);
            if (data !== null) {
                let test = [];
                for (let i = 0; data.length > i; i++) {
                    if(data[i].assetcategoryget !== null){
                        data[i].assettype = data[i].assettype.type;
                    }
                    test.push(data[i])
                }
                setAsset(test);
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
            'headname': 'Asset Name',
            'align': 'left',
        },
        {
            'headname': 'Serial No',
            'align': 'left',
        },
        {
            'headname': 'Quantity',
            'align': 'left',
        },
        {
            'headname': 'Stock',
            'align': 'left',
        },
        {
            'headname': 'Price Value',
            'align': 'left',
        },
        {
            'headname': 'Asset Type',
            'align': 'left',
        },
        {
            'headname': 'Hardwares',
            'align': 'left',
        },
        {
            'headname': 'Action',
            'align': 'right',
        },
    ]

    const tablebodycolumn = ['asset_name', 'serialno', 'quantity','stock','price_value', 'assettype','hardware'];
    return (
        <>
            <Header /><br /><br /><br />
            <div className="row">

                <div className="col-lg-2">
                    <Sidenav currentbtn={'asset'} />
                </div>

                <div className="col-lg-10" style={{ padding: '1em' }}>
                    <button className="addbutton" onClick={() => { navigate(`/addasset/${0}/${'false'}`) }}>
                        <AddIcon />&nbsp;Add Asset
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

                    {asset.length !== 0 ?
                        <Tbl
                            tableheaddata={tableheaddata}
                            search={searchdata}
                            tablebodydata={asset}
                            tablebodycolumn={tablebodycolumn}
                            table={'asset'}
                            addscrn={'addasset'}
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

export default Asset;