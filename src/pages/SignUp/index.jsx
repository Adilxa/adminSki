"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import { AccountCircle, Lock, Email, Business, LocationOn, ArrowForward, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import $api from '@/src/http/Api';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    businessType: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email || !formData.businessType || !formData.address) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    try {
      await $api.post('/users', formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 4, color: 'black' }}>Регистрация</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400, bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2,
        display:"flex",
        flexDirection:"column",
        gap:2
      }}>
        {step === 1 && (
          <>
            <TextField
              required
              fullWidth
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputProps={{ startAdornment: <AccountCircle sx={{ color: 'action.active', mr: 1 }} /> }}
            />
            <TextField
              required
              fullWidth
              label="Электронная почта"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} /> }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              required
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{ startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} /> }}
            />
            <TextField
              required
              fullWidth
              label="Тип бизнеса"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              InputProps={{ startAdornment: <Business sx={{ color: 'action.active', mr: 1 }} /> }}
            />
          </>
        )}

        {step === 3 && (
          <>
            <TextField
              required
              fullWidth
              label="Адрес"
              name="address"
              value={formData.address}
              onChange={handleChange}
              InputProps={{ startAdornment: <LocationOn sx={{ color: 'action.active', mr: 1 }} /> }}
            />
          </>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <IconButton onClick={handleBack} disabled={step === 1}>
            <ArrowBack />
          </IconButton>
          {step < 3 ? (
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          ) : (
            loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" fullWidth>Зарегистрироваться</Button>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
