import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            setSuccess(true);
            setError('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.username?.[0] || 'Registration failed. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        background: 'rgba(19, 47, 76, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join the Battery Database
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Registration successful! Redirecting to login...
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            Register
                        </Button>
                    </form>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#02a8ff',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Sign in here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
