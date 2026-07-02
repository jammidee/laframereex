/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : June 30, 2026 2:00 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Core Dashboard layout orchestration with dynamic body class 
 *                injection to match native AdminLTE body configuration.
 * ------------------------------------------------------------------------
 */

import React, { useEffect } from 'react';

import LaNavigation from '../layout/laNavigation';
import LaSideBar    from '../layout/laSideBar';
import LaFooter     from '../layout/laFooter';


/**
 * STUB COMPONENTS
 * Replace these placeholder sub-components with your actual layout files
 */
// function CgNavigation({ onLogout }) {
//   return (
//     <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <a className="nav-link" data-widget="pushmenu" href="#" role="button">
//             <i className="fas fa-bars"></i>
//           </a>
//         </li>
//       </ul>
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//           <button onClick={onLogout} className="btn btn-sm btn-danger">
//             Logout
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// function LaSideBar() {
//   return (
//     <aside className="main-sidebar sidebar-dark-primary elevation-4">
//       <a href="#" className="brand-link">
//         <span className="brand-text font-weight-light">Lalulla System</span>
//       </a>
//       <div className="sidebar">
//         <nav className="mt-2">
//           <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
//             <li className="nav-item">
//               <a href="#" className="nav-link active">
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Dashboard</p>
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// }

function LaRightBar() {
  return (
    <aside className="control-sidebar control-sidebar-dark">
      <div className="p-3">
        <h5>Control Sidebar</h5>
        <p>Sidebar content</p>
      </div>
    </aside>
  );
}

/**
 * MAIN DASHBOARD COMPONENT
 */
function Dashboard({ onLogout }) {

  return (

    <div className="wrapper">

      {/* Navigation Top Bar */}
      <LaNavigation onLogout={onLogout} />

      {/* Left Main Sidebar Menu */}
      <LaSideBar />

      {/* Right Secondary Control Sidebar */}
      {/* <LaRightBar /> */}

      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h6 className="m-0">Dashboard</h6>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right d-flex justify-content-sm-end list-inline">
                  <li className="breadcrumb-item list-inline-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active list-inline-item">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Viewport */}
        <div className="content">
          <div className="container-fluid">
            
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    Welcome to Lalulla Secure Hub. Authenticated Session Validated.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      {/* Dynamic layout mounting */}
      <LaFooter />

    </div>

  );
}

export default Dashboard;