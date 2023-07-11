import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from './components/home';
import Asset from './components/asset';
import AddEmployee from './components/addemployee';
import AddAsset from './components/addasset';
import AssetType from './components/assettype';
import AddAssetType from './components/addassettype';
import IssueAsset from './components/issueasset';
import ReturnAsset from './components/returnasset';
import AssetHistory from './components/assethistory';
import Login from './components/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/addemployee/:pk/:isedit" element={<AddEmployee />} />
          <Route path="/asset" element={<Asset />} />
          <Route path="/addasset/:pk/:isedit" element={<AddAsset />} />
          <Route path="/assettype" element={<AssetType />} />
          <Route path="/addassettype/:pk/:isedit" element={<AddAssetType />} />
          <Route path="/issueasset" element={<IssueAsset />} />
          <Route path="/returnasset" element={<ReturnAsset />} />
          <Route path="/assethistory" element={<AssetHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
