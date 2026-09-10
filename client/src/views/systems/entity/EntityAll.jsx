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
 * CREATED DATE : August 23, 2026 10:03 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Main Entity List component displaying paginated records 
 * using DataTables UI styling and layout wrappers, featuring an inline modal
 * for creating new entities.
 * ------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';

import LaNavigation from '../../layout/laNavigation';
import LaSideBar    from '../../layout/laSideBar';
import LaFooter     from '../../layout/laFooter';

import entityService from '../../../services/entity.service';

/**
 * STUB COMPONENTS
 * Replace these placeholder sub-components with your actual layout files
 */

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
 * INITIAL FORM STATE
 */
const initialFormState = {
    display_id: '',
    name: '',
    city: '',
    status: 'ACTIVE',
    start_date: '',
    end_date: ''
};

/**
 * ENTITY ALL COMPONENT
 */
function EntityAll({ user, onLogout }) {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination & Search States
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('ASC');

    // Add Entity Modal & Form States
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [formSaving, setFormSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    const fetchEntities = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await entityService.getEntities({
                page,
                limit,
                search,
                sortBy,
                sortOrder
            });

            setEntities(response.data || []);
            setTotalRecords(response.totalRecords || 0);
            setTotalPages(response.totalPages || 1);
        } catch (err) {
            setError(err.message || 'Error loading entities');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities();
    }, [page, limit, search, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(field);
            setSortOrder('ASC');
        }
    };

    /**
     * Handles changes for inputs in the Add Entity form modal.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Resets modal form state and closes the dialog.
     */
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(initialFormState);
        setFormError(null);
    };

    /**
     * Submits the new entity data to entityService.
     */
    const handleCreateEntity = async (e) => {
        e.preventDefault();
        setFormSaving(true);
        setFormError(null);

        try {
            await entityService.createEntity(formData);
            handleCloseModal();
            fetchEntities();
        } catch (err) {
            setFormError(err.message || 'Failed to create entity. Please try again.');
        } finally {
            setFormSaving(false);
        }
    };

    /**
     * Renders the appropriate FontAwesome sort direction icon for a given table column.
     *
     * @param {string} field - The database column name associated with the header.
     * @returns {JSX.Element} FontAwesome icon component.
     */
    const renderSortIcon = (field) => {
        if (sortBy !== field) return <i className="fas fa-sort text-muted ml-1" />;
        return sortOrder === 'ASC' 
            ? <i className="fas fa-sort-up ml-1" /> 
            : <i className="fas fa-sort-down ml-1" />;
    };

    return (
        <div className="wrapper">

            {/* Navigation Top Bar */}
            <LaNavigation user={user} onLogout={onLogout} />

            {/* Left Main Sidebar Menu */}
            <LaSideBar user={user} activePage="entity" onLogout={onLogout} />

            {/* Right Secondary Control Sidebar */}
            {/* <LaRightBar /> */}

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Entity Directory</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right d-flex justify-content-sm-end list-inline">
                                    <li className="breadcrumb-item list-inline-item">
                                        <a href="/dashboard">Home</a>
                                    </li>
                                    <li className="breadcrumb-item list-inline-item">System</li>
                                    <li className="breadcrumb-item active list-inline-item">Entity</li>
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
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">All System Entities</h3>
                                        <div className="card-tools">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <i className="fas fa-plus mr-1" /> Add Entity
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        {/* DataTable Controls Header */}
                                        <div className="row mb-3">
                                            <div className="col-sm-12 col-md-6 d-flex align-items-center">
                                                <label className="d-inline-flex align-items-center font-weight-normal mb-0">
                                                    Show &nbsp;
                                                    <select 
                                                        className="custom-select custom-select-sm form-control form-control-sm w-auto"
                                                        value={limit}
                                                        onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                                                    >
                                                        <option value={10}>10</option>
                                                        <option value={25}>25</option>
                                                        <option value={50}>50</option>
                                                        <option value={100}>100</option>
                                                    </select>
                                                    &nbsp; entries
                                                </label>
                                            </div>

                                            <div className="col-sm-12 col-md-6 d-flex justify-content-md-end align-items-center mt-2 mt-md-0">
                                                <label className="d-inline-flex align-items-center font-weight-normal mb-0">
                                                    Search: &nbsp;
                                                    <input 
                                                        type="search" 
                                                        className="form-control form-control-sm"
                                                        placeholder="Search display ID, name..."
                                                        value={search}
                                                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Table Grid */}
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover table-striped dataTable dtr-inline">
                                                <thead>
                                                    <tr>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('display_id')}>
                                                            Display ID {renderSortIcon('display_id')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
                                                            Entity Name {renderSortIcon('name')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('city')}>
                                                            City {renderSortIcon('city')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
                                                            Status {renderSortIcon('status')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('start_date')}>
                                                            Start Date {renderSortIcon('start_date')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('end_date')}>
                                                            End Date {renderSortIcon('end_date')}
                                                        </th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4">
                                                                <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                                                                <p className="mt-2 mb-0">Loading entities...</p>
                                                            </td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center text-danger py-4">
                                                                <i className="fas fa-exclamation-triangle mr-2" />
                                                                {error}
                                                            </td>
                                                        </tr>
                                                    ) : entities.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4 text-muted">
                                                                No entity records found.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        entities.map((item) => (
                                                            <tr key={item.id}>
                                                                <td><strong>{item.display_id}</strong></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.city || 'N/A'}</td>
                                                                <td>
                                                                    <span className={`badge ${item.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>{item.start_date}</td>
                                                                <td>{item.end_date}</td>
                                                                <td className="text-center">
                                                                    <a href={`/system/entity/edit/${item.id}`} className="btn btn-info btn-xs mr-1">
                                                                        <i className="fas fa-edit" />
                                                                    </a>
                                                                    <a href={`/system/entity/view/${item.id}`} className="btn btn-secondary btn-xs">
                                                                        <i className="fas fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination Controls */}
                                        <div className="row mt-3">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info" role="status" aria-live="polite">
                                                    Showing {entities.length === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, totalRecords)} of {totalRecords} entries
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-7 d-flex justify-content-md-end">
                                                <ul className="pagination pagination-sm m-0">
                                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                                                            Previous
                                                        </button>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, idx) => (
                                                        <li key={idx + 1} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => setPage(idx + 1)}>
                                                                {idx + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${page === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
                                                            Next
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

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

            {/* ADD NEW ENTITY MODAL */}
            {showModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">
                                        <i className="fas fa-plus-circle mr-2" /> Add New Entity
                                    </h5>
                                    <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={handleCreateEntity}>
                                    <div className="modal-body">
                                        {formError && (
                                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                <i className="fas fa-exclamation-triangle mr-2" />
                                                {formError}
                                            </div>
                                        )}

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="display_id">Display ID <span className="text-danger">*</span></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="display_id" 
                                                        name="display_id" 
                                                        placeholder="e.g. ENT-001"
                                                        value={formData.display_id}
                                                        onChange={handleInputChange}
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Entity Name <span className="text-danger">*</span></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="name" 
                                                        name="name" 
                                                        placeholder="Enter full entity name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="city" 
                                                        name="city" 
                                                        placeholder="Enter city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="status">Status</label>
                                                    <select 
                                                        className="form-control" 
                                                        id="status" 
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="ACTIVE">ACTIVE</option>
                                                        <option value="INACTIVE">INACTIVE</option>
                                                        <option value="PENDING">PENDING</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="start_date">Start Date</label>
                                                    <input 
                                                        type="date" 
                                                        className="form-control" 
                                                        id="start_date" 
                                                        name="start_date" 
                                                        value={formData.start_date}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="end_date">End Date</label>
                                                    <input 
                                                        type="date" 
                                                        className="form-control" 
                                                        id="end_date" 
                                                        name="end_date" 
                                                        value={formData.end_date}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer bg-light">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary" 
                                            onClick={handleCloseModal}
                                            disabled={formSaving}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            disabled={formSaving}
                                        >
                                            {formSaving ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin mr-1" /> Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save mr-1" /> Save Entity
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default EntityAll;