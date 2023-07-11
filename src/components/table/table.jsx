import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { supabase } from "../../supabase";
import DialogBox from "../DialogBox/dialog";
import { useNavigate } from "react-router-dom";
import Alr from "../Alert/alr";


const TblRow = (props) => {
    const { count } = props
    const { rowdat } = props;
    const { column } = props;
    const { table } = props;
    const { addscrn } = props;
    const { refresh } = props;
    const navigate = useNavigate();
    const [open, setOpen] = useState();
    const [dial, setdial] = useState([]);
    const [dispAlr, setdispAlr] = useState(false);
    const [alrStatus,setAlrStatus] = useState();
    const [alrMessage, setAlrMessage] = useState('');

    async function deleteRow() {
        try {

            const { error } = await supabase
                .from(table)
                .delete()
                .eq('pk', rowdat.pk)
                setAlrStatus(true); setAlrMessage("1 Row Deleted"); setdispAlr(true);
                refresh();
            if (error) throw console.log(error);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {open === true ? <DialogBox arr={dial} /> : null}
            {dispAlr === true ? <Alr alrstatus={alrStatus} dispalr={setdispAlr} alrmes={alrMessage} /> : null}
            <TableRow key={rowdat.pk} hover={true}>
                <TableCell sx={{ fontFamily: 'prosans' }}>{count}</TableCell>
                {column.map((item, index) => (
                    Object.entries(rowdat).map(([key, value]) => (
                        key == item ? <TableCell sx={{ fontFamily: 'prosans' }}>{
                            value !== null && value.length !== 0 ? value.toString() : "NULL"
                        }
                        </TableCell> : null
                    ))
                ))}
                <TableCell align="right" sx={{ fontFamily: 'prosans' }}>
                    <IconButton aria-label="expand row" size="small"
                        onClick={() => {
                            navigate(`/${addscrn}/${rowdat.pk}/true`)
                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="expand row" size="small"
                        onClick={() => {
                            setOpen(true);
                            setdial({ 
                                'open': true, 
                                'message': 'Do you Want to Delete', 
                                'fun': deleteRow, 
                                'openfun': setOpen 
                            });
                        }}
                        sx={{ color: 'rgba(255, 0, 0, 0.755)' }}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}

const Tbl = (props) => {
    const { tableheaddata } = props;
    const { tablebodydata } = props;
    const { tablebodycolumn } = props;
    const { search } = props;
    const { table } = props;
    const { addscrn } = props;
    const { refresh } = props;
    let count = 0;
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableheaddata.map(obj => (
                                <TableCell
                                    variant={obj.variant}
                                    align={obj.align}
                                    width={obj.width}
                                    sx={{ backgroundColor: 'cadetblue', color: 'white', fontFamily: 'prosans' }}
                                >
                                    {obj.headname}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {search !== '' ?
                            <>
                                {
                                    tablebodydata.map((obj) => {
                                        let isRowRendered = false;
                                        return (
                                            <React.Fragment key={obj.pk}>
                                                {tablebodycolumn.map((ob) => {
                                                    if (!isRowRendered && 
                                                        obj[ob] !== null ? 
                                                        (obj[ob].toString().toLowerCase()).includes(search)
                                                        :null) {
                                                        isRowRendered = true;
                                                        return (
                                                            <TblRow
                                                                count={++count}
                                                                rowdat={obj}
                                                                column={tablebodycolumn}
                                                                table={table}
                                                                addscrn={addscrn}
                                                                refresh={refresh}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </React.Fragment>
                                        );
                                    })
                                }

                            </> :
                            <>
                                {tablebodydata.map(obj => (
                                    <TblRow
                                        count={++count}
                                        rowdat={obj}
                                        column={tablebodycolumn}
                                        table={table}
                                        addscrn={addscrn}
                                        refresh={refresh}
                                    />
                                ))}
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Tbl;