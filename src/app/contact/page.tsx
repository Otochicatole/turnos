'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({
        nombre: false,
        apellido: false,
        mensaje: false
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: value.trim() === ''
        });
    };

    const handleEmailSubmit = async () => {
        const { nombre, apellido, mensaje } = formData;
        if (nombre.trim() === '' || apellido.trim() === '' || mensaje.trim() === '') {
            setErrors({
                nombre: nombre.trim() === '',
                apellido: apellido.trim() === '',
                mensaje: mensaje.trim() === ''
            });
            return;
        }

        try {
            await axios.post('/api/send', formData);
            setSuccessMessage('Correo enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Error al enviar el correo');
        }
    };

    const PHONE_NUMBER = '5493364551193';

    const handleWhatsAppSubmit = () => {
        const { nombre, apellido, mensaje } = formData;
        if (nombre.trim() === '' || apellido.trim() === '' || mensaje.trim() === '') {
            setErrors({
                nombre: nombre.trim() === '',
                apellido: apellido.trim() === '',
                mensaje: mensaje.trim() === ''
            });
            return;
        }

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(`Nombre: ${formData.nombre}\nApellido: ${formData.apellido}\nMensaje: ${formData.mensaje}`)}`;
        window.open(whatsappUrl, '_blank');
    };

    const isFormComplete = formData.nombre.trim() !== '' && formData.apellido.trim() !== '' && formData.mensaje.trim() !== '';

    return (
        <Container style={{ marginTop: '100px' }} maxWidth="sm">
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-center mb-3 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
            >
                Contacto
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={errors.nombre}
                    helperText={errors.nombre ? 'Este campo es requerido' : ''}
                />
                <TextField
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={errors.apellido}
                    helperText={errors.apellido ? 'Este campo es requerido' : ''}
                />
                <TextField
                    label="Mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={errors.mensaje}
                    helperText={errors.mensaje ? 'Este campo es requerido' : ''}
                />
                {successMessage && (
                    <Typography
                        variant="body1"
                        color="success"
                        style={{ marginTop: '20px' }}
                    >
                        {successMessage}
                    </Typography>
                )}
                {isFormComplete && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AiOutlineMail />}
                            onClick={handleEmailSubmit}
                            style={{ marginRight: '10px', marginTop: '20px' }}
                        >
                            Enviar Correo
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AiOutlineWhatsApp />}
                            onClick={handleWhatsAppSubmit}
                            style={{ marginTop: '20px' }}
                        >
                            Enviar WhatsApp
                        </Button>
                    </>
                )}
            </motion.div>
        </Container>
    );
}