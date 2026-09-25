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
 * CREATED DATE : September 20, 2026 12:00 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Main Lookup List component displaying paginated records 
 * using DataTables UI styling and layout wrappers, featuring inline modals
 * for creating, viewing, editing, and deleting lookups with success/error alerts.
 * ------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';

import LaNavigation from './layout/laNavigation';
import LaSideBar    from './layout/laSideBar';
import LaFooter     from './layout/laFooter';

import lookupService from './lookup.service';

/**
 * INITIAL FORM STATE
 */
const initialFormState = {
    entityid: 'CGONE',
    appid: '',
    keyid: '',
    itemid: '',
    description: '',
    colstr01: '_NA_',
    colstr02: '_NA_',
    colstr03: '_NA_',
    colnum01: 0,
    colnum02: 0,
    sstatus: 'ACTIVE'
};

/**
 * LOOKUP ALL COMPONENT
 */
function LookupAll({ user, onLogout }) {

    // Initiate variables
    const [lookups, setLookups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter by entityid state (default to 'CGONE')
    const [entityIdFilter, setEntityIdFilter] = useState('CGONE');

    // Global Notification Banner State
    const [notification, setNotification] = useState(null);

    // Pagination & Search States
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('ASC');

    // Add Lookup Modal & Form States
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [formSaving, setFormSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    // View Lookup Modal States
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    // Edit Lookup Modal & Form States
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState(initialFormState);
    const [editSaving, setEditSaving] = useState(false);
    const [editError, setEditError] = useState(null);

    // Delete Confirmation Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState('');
    const [deleteDeleting, setDeleteDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    // Helper to auto-dismiss notifications after 5 seconds
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    // Fetch data from server
    const fetchLookups = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await lookupService.getLookups({
                entityid: entityIdFilter || 'CGONE',
                page,
                limit,
                search,
                sortBy,
                sortOrder
            });

            setLookups(response.data || []);
            setTotalRecords(response.totalRecords || 0);
            setTotalPages(response.totalPages || 1);

        } catch (err) {
            setError(err.message || 'Error loading lookups');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Data on dependency changes
    useEffect(() => {
        fetchLookups();
    }, [entityIdFilter, page, limit, search, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(field);
            setSortOrder('ASC');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(initialFormState);
        setFormError(null);
    };

    const handleCreateLookup = async (e) => {
        e.preventDefault();
        setFormSaving(true);
        setFormError(null);

        try {
            await lookupService.createLookup(formData);
            handleCloseModal();
            fetchLookups();
            showNotification('success', 'Lookup record successfully created.');
        } catch (err) {
            setFormError(err.message || 'Failed to create lookup. Please try again.');
        } finally {
            setFormSaving(false);
        }
    };

    const handleOpenView = async (id) => {
        setShowViewModal(true);
        setViewLoading(true);
        setViewData(null);
        try {
            const response = await lookupService.getLookupById(id);
            setViewData(response.data || response);
        } catch (err) {
            setError(err.message || 'Failed to fetch lookup details.');
        } finally {
            setViewLoading(false);
        }
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setViewData(null);
    };

    const handleOpenEdit = async (id) => {
        setEditId(id);
        setShowEditModal(true);
        setEditError(null);
        try {
            const response = await lookupService.getLookupById(id);
            const data = response.data || response;
            setEditFormData({
                entityid: data.entityid || 'CGONE',
                appid: data.appid || '',
                keyid: data.keyid || '',
                itemid: data.itemid || '',
                description: data.description || '',
                colstr01: data.colstr01 || '_NA_',
                colstr02: data.colstr02 || '_NA_',
                colstr03: data.colstr03 || '_NA_',
                colnum01: data.colnum01 || 0,
                colnum02: data.colnum02 || 0,
                sstatus: data.sstatus || 'ACTIVE'
            });
        } catch (err) {
            setEditError(err.message || 'Failed to load lookup record for editing.');
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditId(null);
        setEditFormData(initialFormState);
        setEditError(null);
    };

    const handleUpdateLookup = async (e) => {
        e.preventDefault();
        setEditSaving(true);
        setEditError(null);

        try {
            await lookupService.updateLookup(editId, editFormData);
            handleCloseEditModal();
            fetchLookups();
            showNotification('success', 'Lookup record successfully updated.');
        } catch (err) {
            setEditError(err.message || 'Failed to update lookup record.');
            showNotification('danger', err.message || 'Failed to update lookup record.');
        } finally {
            setEditSaving(false);
        }
    };

    const handleOpenDelete = (item) => {
        setDeleteId(item.id);
        setDeleteName(item.keyid || item.itemid || item.id);
        setShowDeleteModal(true);
        setDeleteError(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
        setDeleteName('');
        setDeleteError(null);
    };

    const handleDeleteLookup = async () => {
        setDeleteDeleting(true);
        setDeleteError(null);

        try {
            await lookupService.deleteLookup(deleteId);
            handleCloseDeleteModal();
            fetchLookups();
            showNotification('success', 'Lookup record successfully deleted.');
        } catch (err) {
            setDeleteError(err.message || 'Failed to delete lookup record.');
            showNotification('danger', err.message || 'Failed to delete lookup record.');
        } finally {
            setDeleteDeleting(false);
        }
    };

    const renderSortIcon = (field) => {
        if (sortBy !== field) return <i className="fas fa-sort text-muted ml-1" />;
        return sortOrder === 'ASC' 
            ? <i className="fas fa-sort-up ml-1" /> 
            : <i className="fas fa-sort-down ml-1" />;
    };

    return (
        <div className="wrapper">
            <LaNavigation user={user} onLogout={onLogout} />
            <LaSideBar user={user} activePage="lookup" onLogout={onLogout} />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h4 className="m-0 text-dark">Lookup Management</h4>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right d-flex justify-content-sm-end list-inline">
                                    <li className="breadcrumb-item list-inline-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item list-inline-item">System</li>
                                    <li className="breadcrumb-item active list-inline-item">Lookup</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="container-fluid">
                        {notification && (
                            <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
                                <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-2`} />
                                {notification.message}
                                <button type="button" className="close" onClick={() => setNotification(null)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}

                        <div className="row">
                            <div className="col-12">
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">System Lookup Entries</h3>
                                        <div className="card-tools">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <i className="fas fa-plus mr-1" /> Add Lookup
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        {/* Filters & Control Header */}
                                        <div className="row mb-3">
                                            <div className="col-sm-12 col-md-4 d-flex align-items-center mb-2 mb-md-0">
                                                <label className="d-inline-flex align-items-center font-weight-normal mb-0 w-100">
                                                    Entity ID: &nbsp;
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={entityIdFilter}
                                                        onChange={(e) => { setEntityIdFilter(e.target.value); setPage(1); }}
                                                        placeholder="CGONE"
                                                    />
                                                </label>
                                            </div>

                                            <div className="col-sm-12 col-md-4 d-flex align-items-center mb-2 mb-md-0">
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

                                            <div className="col-sm-12 col-md-4 d-flex justify-content-md-end align-items-center">
                                                <label className="d-inline-flex align-items-center font-weight-normal mb-0 w-100 justify-content-md-end">
                                                    Search: &nbsp;
                                                    <input 
                                                        type="search" 
                                                        className="form-control form-control-sm"
                                                        placeholder="KeyID, ItemID, desc..."
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
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('entityid')}>
                                                            Entity ID {renderSortIcon('entityid')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('appid')}>
                                                            App ID {renderSortIcon('appid')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('keyid')}>
                                                            Key ID {renderSortIcon('keyid')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('itemid')}>
                                                            Item ID {renderSortIcon('itemid')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('description')}>
                                                            Description {renderSortIcon('description')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('sstatus')}>
                                                            Status {renderSortIcon('sstatus')}
                                                        </th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4">
                                                                <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                                                                <p className="mt-2 mb-0">Loading lookups...</p>
                                                            </td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center text-danger py-4">
                                                                <i className="fas fa-exclamation-triangle mr-2" />
                                                                {error}
                                                            </td>
                                                        </tr>
                                                    ) : lookups.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4 text-muted">
                                                                No lookup records found.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        lookups.map((item) => (
                                                            <tr key={item.id}>
                                                                <td><strong>{item.entityid}</strong></td>
                                                                <td>{item.appid || 'N/A'}</td>
                                                                <td>{item.keyid}</td>
                                                                <td>{item.itemid}</td>
                                                                <td>{item.description || 'N/A'}</td>
                                                                <td>
                                                                    <span className={`badge ${item.sstatus === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
                                                                        {item.sstatus}
                                                                    </span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn btn-info btn-xs mr-1" 
                                                                        title="Edit"
                                                                        onClick={() => handleOpenEdit(item.id)}
                                                                    >
                                                                        <i className="fas fa-edit" />
                                                                    </button>
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn btn-secondary btn-xs mr-1" 
                                                                        title="View"
                                                                        onClick={() => handleOpenView(item.id)}
                                                                    >
                                                                        <i className="fas fa-eye" />
                                                                    </button>
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn btn-danger btn-xs" 
                                                                        title="Delete"
                                                                        onClick={() => handleOpenDelete(item)}
                                                                    >
                                                                        <i className="fas fa-trash" />
                                                                    </button>
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
                                                    Showing {lookups.length === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, totalRecords)} of {totalRecords} entries
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
            </div>

            <LaFooter />

            {/* ADD LOOKUP MODAL */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title"><i className="fas fa-plus-circle mr-2" /> Add New Lookup</h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleCreateLookup}>
                                <div className="modal-body">
                                    {formError && (
                                        <div className="alert alert-danger" role="alert">
                                            <i className="fas fa-exclamation-triangle mr-2" />{formError}
                                        </div>
                                    )}

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="entityid">Entity ID</label>
                                                <input type="text" className="form-control" id="entityid" name="entityid" value={formData.entityid} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="appid">App ID</label>
                                                <input type="text" className="form-control" id="appid" name="appid" value={formData.appid} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="keyid">Key ID <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="keyid" name="keyid" value={formData.keyid} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="itemid">Item ID <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="itemid" name="itemid" value={formData.itemid} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="description">Description</label>
                                                <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="colstr01">Column String 01</label>
                                                <input type="text" className="form-control" id="colstr01" name="colstr01" value={formData.colstr01} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="colnum01">Column Num 01</label>
                                                <input type="number" step="any" className="form-control" id="colnum01" name="colnum01" value={formData.colnum01} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="sstatus">Status</label>
                                                <select className="form-control" id="sstatus" name="sstatus" value={formData.sstatus} onChange={handleInputChange}>
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={formSaving}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={formSaving}>
                                        {formSaving ? <><i className="fas fa-spinner fa-spin mr-1" /> Saving...</> : <><i className="fas fa-save mr-1" /> Save Lookup</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW LOOKUP MODAL */}
            {showViewModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-secondary text-white">
                                <h5 className="modal-title"><i className="fas fa-eye mr-2" /> View Lookup Details</h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseViewModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {viewLoading ? (
                                    <div className="text-center py-4"><i className="fas fa-spinner fa-spin fa-2x text-secondary" /></div>
                                ) : viewData ? (
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                            <tr><th style={{ width: '30%' }}>ID</th><td>{viewData.id}</td></tr>
                                            <tr><th>Entity ID</th><td><strong>{viewData.entityid}</strong></td></tr>
                                            <tr><th>App ID</th><td>{viewData.appid || 'N/A'}</td></tr>
                                            <tr><th>Key ID</th><td>{viewData.keyid}</td></tr>
                                            <tr><th>Item ID</th><td>{viewData.itemid}</td></tr>
                                            <tr><th>Description</th><td>{viewData.description || 'N/A'}</td></tr>
                                            <tr><th>Status</th><td><span className={`badge ${viewData.sstatus === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>{viewData.sstatus}</span></td></tr>
                                        </tbody>
                                    </table>
                                ) : <p className="text-center text-danger">No data available.</p>}
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseViewModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT LOOKUP MODAL */}
            {showEditModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title"><i className="fas fa-edit mr-2" /> Edit Lookup Record</h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseEditModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleUpdateLookup}>
                                <div className="modal-body">
                                    {editError && <div className="alert alert-danger">{editError}</div>}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_entityid">Entity ID</label>
                                                <input type="text" className="form-control" id="edit_entityid" name="entityid" value={editFormData.entityid} onChange={handleEditInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_keyid">Key ID</label>
                                                <input type="text" className="form-control" id="edit_keyid" name="keyid" value={editFormData.keyid} onChange={handleEditInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_itemid">Item ID</label>
                                                <input type="text" className="form-control" id="edit_itemid" name="itemid" value={editFormData.itemid} onChange={handleEditInputChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="edit_description">Description</label>
                                                <input type="text" className="form-control" id="edit_description" name="description" value={editFormData.description} onChange={handleEditInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_sstatus">Status</label>
                                                <select className="form-control" id="edit_sstatus" name="sstatus" value={editFormData.sstatus} onChange={handleEditInputChange}>
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal} disabled={editSaving}>Cancel</button>
                                    <button type="submit" className="btn btn-info text-white" disabled={editSaving}>
                                        {editSaving ? <><i className="fas fa-spinner fa-spin mr-1" /> Updating...</> : <><i className="fas fa-save mr-1" /> Update Changes</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title"><i className="fas fa-exclamation-triangle mr-2" /> Confirm Deletion</h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseDeleteModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {deleteError && <div className="alert alert-danger">{deleteError}</div>}
                                <p>Are you sure you want to delete lookup item: <strong>{deleteName}</strong>?</p>
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal} disabled={deleteDeleting}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteLookup} disabled={deleteDeleting}>
                                    {deleteDeleting ? <><i className="fas fa-spinner fa-spin mr-1" /> Deleting...</> : <><i className="fas fa-trash mr-1" /> Confirm Delete</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LookupAll;