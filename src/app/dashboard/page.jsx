"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import $api from '@/src/http/Api';

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentShop, setCurrentShop] = useState({ id: '', name: '', address: '' });
  
  // Fetch shops when the component loads
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await $api.get('/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке магазинов:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleOpenDialog = (shop = { id: '', name: '', address: '' }) => {
    setCurrentShop(shop);
    setIsEdit(!!shop.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentShop({ id: '', name: '', address: '' });
  };

  const handleSaveShop = async () => {
    try {
      if (isEdit) {
        await $api.put(`/shops/${currentShop.id}`, currentShop);
      } else {
        await $api.post('/shops', currentShop);
      }
      const response = await $api.get('/shops');
      setShops(response.data);
      handleCloseDialog();
    } catch (error) {
      console.error('Ошибка при сохранении магазина:', error);
    }
  };

  const handleDeleteShop = async (shopId) => {
    try {
      await $api.delete(`/shops/${shopId}`);
      const response = await $api.get('/shops');
      setShops(response.data);
    } catch (error) {
      console.error('Ошибка при удалении магазина:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Управление магазинами</Typography>
      
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} sx={{ mb: 4 }}>
        Добавить магазин
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {shops.map((shop) => (
            <ListItem key={shop.id} sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.1)', borderRadius: 1 }}>
              <ListItemText primary={shop.name} secondary={shop.address} />
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(shop)} sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteShop(shop.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      {/* Dialog for adding/editing shops */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Редактировать магазин' : 'Добавить магазин'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название магазина"
            fullWidth
            value={currentShop.name}
            onChange={(e) => setCurrentShop({ ...currentShop, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Адрес магазина"
            fullWidth
            value={currentShop.address}
            onChange={(e) => setCurrentShop({ ...currentShop, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSaveShop}>{isEdit ? 'Сохранить' : 'Добавить'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
