import { Alert } from "@mui/material";


const Alr = ({alrstatus, dispalr, alrmes}) => {
    return (
        <div style={{position: 'fixed',top:'10%',left: '50%',transform: 'translate(-50%, -50%)', zIndex:'4'}}>
            <Alert severity={alrstatus === true ? "success" : "error"}
                onClose={() => { dispalr(false) }}>{alrmes}</Alert>
        </div>
    );
}

export default Alr;