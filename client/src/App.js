import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [equipment, setEquipment] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        status: 'Active',
        last_cleaned_date: ''
    });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/equipment');
            setEquipment(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- NEW HELPER: Get Today's Date in YYYY-MM-DD format ---
    const getTodayString = () => {
        return new Date().toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- NEW VALIDATION: Check for Future Date ---
        const selectedDate = new Date(formData.last_cleaned_date);
        const today = new Date();
        // Reset time to midnight so we only compare dates, not hours
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            alert("Error: Last Cleaned Date cannot be in the future.");
            return; // Stop the function here
        }

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/equipment/${editId}`, formData);
                setEditId(null);
            } else {
                await axios.post('http://localhost:5000/api/equipment', formData);
            }
            
            setFormData({ name: '', type: '', status: 'Active', last_cleaned_date: '' });
            fetchEquipment();
        } catch (err) {
            console.error("Error saving data:", err);
            alert("Failed to save. Is the backend server running?");
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setFormData({
            name: item.name,
            type: item.type,
            status: item.status,
            last_cleaned_date: item.last_cleaned_date ? item.last_cleaned_date.split('T')[0] : ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`http://localhost:5000/api/equipment/${id}`);
                fetchEquipment();
            } catch (err) {
                console.error("Error deleting:", err);
            }
        }
    };

    return (
        <div className="container">
            <h1>Equipment Tracker</h1>
            
            <div className="card">
                <h2>{editId ? 'Update Equipment' : 'Add New Equipment'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name (e.g. Drill Press)"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="Type (e.g. Heavy Machinery)"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Retired">Retired</option>
                    </select>
                    
                    {/* UPDATED DATE INPUT */}
                    <input
                        type="date"
                        name="last_cleaned_date"
                        value={formData.last_cleaned_date}
                        onChange={handleChange}
                        max={getTodayString()} // Blocks future dates in the calendar UI
                        required
                    />

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className={editId ? "edit-btn" : "add-btn"}
                        >
                            {editId ? 'Update Equipment' : 'Add Equipment'}
                        </button>

                        {editId && (
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => {
                                    setEditId(null);
                                    setFormData({ name: '', type: '', status: 'Active', last_cleaned_date: '' });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="list-container">
                <h2>Inventory List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Last Cleaned</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>
                                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.last_cleaned_date ? item.last_cleaned_date.split('T')[0] : ''}</td>
                                <td>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(item)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;