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
 * CREATED DATE : September 27, 2026 02:27 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Main User List component displaying paginated records 
 * using DataTables UI styling and layout wrappers, featuring inline modals
 * for creating, viewing, editing, and deleting users with success/error alerts.
 * ------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';

import LaNavigation from '../../layout/laNavigation';
import LaSideBar    from '../../layout/laSideBar';
import LaFooter     from '../../layout/laFooter';

import userService from '../../../services/user.service';

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
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    gender: '',
    status: 'ACTIVE',
    roleid: 'USER',
    entityid: 'CGONE'
};

/**
 * USER ALL COMPONENT
 */
function UserAll({ user, onLogout }) {

    //Initiate variables
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Global Notification Banner State
    const [notification, setNotification] = useState(null); // { type: 'success' | 'danger', message: '' }

    // Pagination & Search States
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('DESC');

    // Add User Modal & Form States
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [formSaving, setFormSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    // View User Modal States
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    // Edit User Modal & Form States
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

    //Fetch data from server
    const fetchUsers = async () => {

        //Display loading page
        setLoading(true);
        setError(null);

        try {
            const response = await userService.getUsers({
                page,
                limit,
                search,
                sortBy,
                sortOrder
            });

            setUsers(response.data || []);
            setTotalRecords(response.totalRecords || 0);
            setTotalPages(response.totalPages || 1);

        } catch (err) {
            setError(err.message || 'Error loading users');
        } finally {
            setLoading(false);
        }
    };


    //Fetch Data
    useEffect(() => {

        fetchUsers();

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
     * Handles changes for inputs in the Add User form modal.
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
     * Submits the new user data to userService.
     */
    const handleCreateUser = async (e) => {

        e.preventDefault();

        setFormSaving(true);
        setFormError(null);

        try {

            await userService.createUser(formData);
            handleCloseModal();
            fetchUsers();
            showNotification('success', 'User record successfully created.');

        } catch (err) {
            setFormError(err.message || 'Failed to create user. Please try again.');
        } finally {
            setFormSaving(false);
        }
    };

    /**
     * Opens View Modal and loads single user details.
     */
    const handleOpenView = async (id) => {
        setShowViewModal(true);
        setViewLoading(true);
        setViewData(null);
        try {
            const response = await userService.getUserById(id);
            setViewData(response.data || response);
        } catch (err) {
            setError(err.message || 'Failed to fetch user details.');
        } finally {
            setViewLoading(false);
        }
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setViewData(null);
    };

    /**
     * Opens Edit Modal and loads user data into state.
     */
    const handleOpenEdit = async (id) => {
        setEditId(id);
        setShowEditModal(true);
        setEditError(null);
        try {
            const response = await userService.getUserById(id);
            const data = response.data || response;
            setEditFormData({
                username: data.username || '',
                password: '',
                email: data.email || '',
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                phone: data.phone || '',
                gender: data.gender || '',
                status: data.status || 'ACTIVE',
                roleid: data.roleid || 'USER',
                entityid: data.entityid || 'CGONE'
            });
        } catch (err) {
            setEditError(err.message || 'Failed to load user record for editing.');
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

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setEditSaving(true);
        setEditError(null);

        try {
            const payload = { ...editFormData };
            if (!payload.password) {
                delete payload.password;
            }
            await userService.updateUser(editId, payload);
            handleCloseEditModal();
            fetchUsers();
            showNotification('success', 'User record successfully updated.');
        } catch (err) {
            setEditError(err.message || 'Failed to update user record.');
            showNotification('danger', err.message || 'Failed to update user record.');
        } finally {
            setEditSaving(false);
        }
    };

    /**
     * Opens Delete Confirmation Modal.
     */
    const handleOpenDelete = (item) => {
        setDeleteId(item.id);
        setDeleteName(item.username);
        setShowDeleteModal(true);
        setDeleteError(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
        setDeleteName('');
        setDeleteError(null);
    };

    const handleDeleteUser = async () => {
        setDeleteDeleting(true);
        setDeleteError(null);

        try {
            await userService.deleteUser(deleteId);
            handleCloseDeleteModal();
            fetchUsers();
            showNotification('success', 'User record successfully deleted.');
        } catch (err) {
            setDeleteError(err.message || 'Failed to delete user record.');
            showNotification('danger', err.message || 'Failed to delete user record.');
        } finally {
            setDeleteDeleting(false);
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
            <LaSideBar user={user} activePage="user" onLogout={onLogout} />

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h4 className="m-0 text-dark">User Directory</h4>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right d-flex justify-content-sm-end list-inline">
                                    <li className="breadcrumb-item list-inline-item">
                                        <a href="/dashboard">Home</a>
                                    </li>
                                    <li className="breadcrumb-item list-inline-item">System</li>
                                    <li className="breadcrumb-item active list-inline-item">User</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Viewport */}
                <div className="content">
                    <div className="container-fluid">

                        {/* Global Notification Banner */}
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
                                        <h3 className="card-title">All System Users</h3>
                                        <div className="card-tools">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <i className="fas fa-plus mr-1" /> Add User
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
                                                        placeholder="Search username, email, name..."
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
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('username')}>
                                                            Username {renderSortIcon('username')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
                                                            Email {renderSortIcon('email')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('firstname')}>
                                                            First Name {renderSortIcon('firstname')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('lastname')}>
                                                            Last Name {renderSortIcon('lastname')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
                                                            Status {renderSortIcon('status')}
                                                        </th>
                                                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('roleid')}>
                                                            Role {renderSortIcon('roleid')}
                                                        </th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4">
                                                                <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                                                                <p className="mt-2 mb-0">Loading users...</p>
                                                            </td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center text-danger py-4">
                                                                <i className="fas fa-exclamation-triangle mr-2" />
                                                                {error}
                                                            </td>
                                                        </tr>
                                                    ) : users.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4 text-muted">
                                                                No user records found.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        users.map((item) => (
                                                            <tr key={item.id}>
                                                                <td><strong>{item.username}</strong></td>
                                                                <td>{item.email}</td>
                                                                <td>{item.firstname}</td>
                                                                <td>{item.lastname}</td>
                                                                <td>
                                                                    <span className={`badge ${item.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>{item.roleid}</td>
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
                                                    Showing {users.length === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, totalRecords)} of {totalRecords} entries
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

            {/* ADD NEW USER MODAL */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-plus-circle mr-2" /> Add New User
                                </h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleCreateUser}>
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
                                                <label htmlFor="username">Username <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="username" 
                                                    name="username" 
                                                    placeholder="Enter username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="password">Password <span className="text-danger">*</span></label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="password" 
                                                    name="password" 
                                                    placeholder="Enter password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="email" 
                                                    name="email" 
                                                    placeholder="Enter email address"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="phone" 
                                                    name="phone" 
                                                    placeholder="Enter phone number"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="firstname">First Name <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="firstname" 
                                                    name="firstname" 
                                                    placeholder="Enter first name"
                                                    value={formData.firstname}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="lastname">Last Name <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="lastname" 
                                                    name="lastname" 
                                                    placeholder="Enter last name"
                                                    value={formData.lastname}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="gender">Gender</label>
                                                <select 
                                                    className="form-control" 
                                                    id="gender" 
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                    <option value="3">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
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
                                                    <option value="SUSPENDED">SUSPENDED</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="roleid">Role ID</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="roleid" 
                                                    name="roleid" 
                                                    value={formData.roleid}
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
                                                <i className="fas fa-save mr-1" /> Save User
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW USER MODAL */}
            {showViewModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-secondary text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-eye mr-2" /> View User Details
                                </h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseViewModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {viewLoading ? (
                                    <div className="text-center py-4">
                                        <i className="fas fa-spinner fa-spin fa-2x text-secondary" />
                                        <p className="mt-2 mb-0">Loading details...</p>
                                    </div>
                                ) : viewData ? (
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '30%' }}>ID</th>
                                                <td>{viewData.id}</td>
                                            </tr>
                                            <tr>
                                                <th>JUID</th>
                                                <td>{viewData.juid}</td>
                                            </tr>
                                            <tr>
                                                <th>Username</th>
                                                <td><strong>{viewData.username}</strong></td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{viewData.email}</td>
                                            </tr>
                                            <tr>
                                                <th>First Name</th>
                                                <td>{viewData.firstname}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Name</th>
                                                <td>{viewData.lastname}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{viewData.phone || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>{viewData.gender === 1 ? 'Male' : viewData.gender === 2 ? 'Female' : viewData.gender === 3 ? 'Other' : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>
                                                    <span className={`badge ${viewData.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
                                                        {viewData.status}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Role ID</th>
                                                <td>{viewData.roleid}</td>
                                            </tr>
                                            <tr>
                                                <th>Entity ID</th>
                                                <td>{viewData.entityid}</td>
                                            </tr>
                                            <tr>
                                                <th>Created At</th>
                                                <td>{viewData.createdAt || viewData.created_at || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th>Updated At</th>
                                                <td>{viewData.updatedAt || viewData.updated_at || 'N/A'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-danger">No data available.</p>
                                )}
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseViewModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT USER MODAL */}
            {showEditModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-edit mr-2" /> Edit User Record
                                </h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseEditModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleUpdateUser}>
                                <div className="modal-body">
                                    {editError && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <i className="fas fa-exclamation-triangle mr-2" />
                                            {editError}
                                        </div>
                                    )}

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_username">Username <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="edit_username" 
                                                    name="username" 
                                                    value={editFormData.username}
                                                    onChange={handleEditInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_password">Password <small className="text-muted">(Leave blank to keep current)</small></label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="edit_password" 
                                                    name="password" 
                                                    placeholder="Enter new password if changing"
                                                    value={editFormData.password}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_email">Email <span className="text-danger">*</span></label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="edit_email" 
                                                    name="email" 
                                                    value={editFormData.email}
                                                    onChange={handleEditInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_phone">Phone</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="edit_phone" 
                                                    name="phone" 
                                                    value={editFormData.phone}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_firstname">First Name <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="edit_firstname" 
                                                    name="firstname" 
                                                    value={editFormData.firstname}
                                                    onChange={handleEditInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="edit_lastname">Last Name <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="edit_lastname" 
                                                    name="lastname" 
                                                    value={editFormData.lastname}
                                                    onChange={handleEditInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_gender">Gender</label>
                                                <select 
                                                    className="form-control" 
                                                    id="edit_gender" 
                                                    name="gender"
                                                    value={editFormData.gender}
                                                    onChange={handleEditInputChange}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                    <option value="3">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_status">Status</label>
                                                <select 
                                                    className="form-control" 
                                                    id="edit_status" 
                                                    name="status"
                                                    value={editFormData.status}
                                                    onChange={handleEditInputChange}
                                                >
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                    <option value="SUSPENDED">SUSPENDED</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="edit_roleid">Role ID</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="edit_roleid" 
                                                    name="roleid" 
                                                    value={editFormData.roleid}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={handleCloseEditModal}
                                        disabled={editSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-info text-white"
                                        disabled={editSaving}
                                    >
                                        {editSaving ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-1" /> Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-save mr-1" /> Update Changes
                                            </>
                                        )}
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
                                <h5 className="modal-title">
                                    <i className="fas fa-exclamation-triangle mr-2" /> Confirm Deletion
                                </h5>
                                <button type="button" className="close text-white" aria-label="Close" onClick={handleCloseDeleteModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {deleteError && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i className="fas fa-exclamation-triangle mr-2" />
                                        {deleteError}
                                    </div>
                                )}
                                <p>Are you sure you want to delete user record: <strong>{deleteName}</strong>?</p>
                                <p className="text-danger mb-0"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer bg-light">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={handleCloseDeleteModal}
                                    disabled={deleteDeleting}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={handleDeleteUser}
                                    disabled={deleteDeleting}
                                >
                                    {deleteDeleting ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-1" /> Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-trash mr-1" /> Confirm Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default UserAll;