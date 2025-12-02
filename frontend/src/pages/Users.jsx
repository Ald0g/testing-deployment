import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../services/api';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Alert,
} from '@mui/material';
import { Delete as DeleteIcon, ArrowBack, BatteryChargingFull } from '@mui/icons-material';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (err) {
            setError('Failed to load users. You may not have admin permissions.');
        }
    };

    const handleDelete = async (userId, username) => {
        if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
            try {
                await deleteUser(userId);
                setSuccess(`User "${username}" deleted successfully.`);
                setError('');
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user.');
                setSuccess('');
            }
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'rgba(19, 47, 76, 0.8)' }}>
                <Toolbar>
                    <BatteryChargingFull sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Battery Database - User Management
                    </Typography>
                    <Button
                        color="inherit"
                        startIcon={<ArrowBack />}
                        onClick={handleBack}
                        sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                        Back to Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4 }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        background: 'rgba(19, 47, 76, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        User Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Manage all users in the system. Admin users can view and delete users.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Joined</TableCell>
                                    <TableCell>Last Login</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email || 'N/A'}</TableCell>
                                        <TableCell>
                                            {user.is_superuser ? (
                                                <Chip label="Superuser" color="error" size="small" />
                                            ) : user.is_staff ? (
                                                <Chip label="Staff" color="warning" size="small" />
                                            ) : (
                                                <Chip label="User" color="default" size="small" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.date_joined).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(user.id, user.username)}
                                                disabled={user.is_superuser}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {users.length === 0 && !error && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                            No users found.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default Users;
