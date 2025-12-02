import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/api';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Paper,
    Avatar,
} from '@mui/material';
import { Logout as LogoutIcon, BatteryChargingFull, People } from '@mui/icons-material';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe();
                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const handleManageUsers = () => {
        navigate('/users');
    };

    if (!user) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)' }}>
            <AppBar position="static" elevation={0} sx={{ background: 'rgba(19, 47, 76, 0.8)' }}>
                <Toolbar>
                    <BatteryChargingFull sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Battery Database
                    </Typography>
                    {(user.is_staff || user.is_superuser) && (
                        <Button
                            color="inherit"
                            startIcon={<People />}
                            onClick={handleManageUsers}
                            sx={{ '&:hover': { color: 'primary.main' }, mr: 2 }}
                        >
                            Manage Users
                        </Button>
                    )}
                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                        Logout
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                            sx={{
                                width: 64,
                                height: 64,
                                bgcolor: 'primary.main',
                                mr: 2,
                                fontSize: '2rem',
                            }}
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Welcome, {user.username}!
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your battery database is ready. Future features will appear here.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Home;
