"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import $api from '@/src/http/Api';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Пожалуйста, введите имя пользователя и пароль');
      return;
    }
    
    setLoading(true);
    try {
      const response = await $api.get('/users', { params: { name: username, password } });
      if (response.data.length > 0) {
        router.push('/dashboard');
      } else {
        alert('Неправильные данные');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',p: 3 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 4, color: 'black' }}>Привет Админ!</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400, bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 , display:"flex",
        flexDirection:"column",
        gap:2
      }}>
        <TextField
          required
          fullWidth
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{ startAdornment: <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> }}
        />
        <TextField
          required
          fullWidth
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} /> }}
        />
        {loading ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : (
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            <Typography fontWeight={600}>
            Войти
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
