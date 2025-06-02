"use client";
import * as React from "react";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  unavailableDatesProp: string[];
  occupiedTimesByDate: { [key: string]: string[] };
  allTimes: string[];
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  unavailableDatesProp,
  occupiedTimesByDate,
  allTimes,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | React.JSX.Element>("");
  const [showSuccessCard, setShowSuccessCard] = useState<boolean>(false);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    setSelectedTime(event.target.value as string);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleConfirm = async () => {
    if (!firstName || !lastName || !selectedDate || !selectedTime) {
      setError("Todos los campos son requeridos.");
      setSuccessMessage("");
      setShowSuccessCard(false);
    } else {
      setError("");
      setSuccessMessage("");
      setShowSuccessCard(false);

      const turno = {
        firstName,
        lastName,
        phoneNumber,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime,
      };

      const token = process.env.NEXT_PUBLIC_API_TOKKEN;

      if (!token) {
        console.error("API_TOKKEN no está definido");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/turnos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: turno }),
        });
        if (res.ok) {
          const messageSuccess = <div className="">
            <h2 className="text-2xl">El turno se ha guardado correctamente.</h2>
            <p className=" text-orange-400/60">Tu turno se confirmarara via WhatsApp.</p>
            <p className="text-sm text-red-500/60">Si tu turno no fue confirmado dentro de las 24 horas, por favor contactanos por WhatsApp.</p>
            <p className="mt-4">Puedes revisar los turnos confirmados en la sección de &apos;Turnos Confirmados&apos;.</p>
            <p className="mt-1">Si tienes alguna duda, no dudes en contactarnos.</p>
            <p className="text-white/50 mt-10">¡Gracias por elegirnos!</p>
          </div>
          setSuccessMessage(messageSuccess);
          setShowSuccessCard(true);
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setSelectedDate(null);
          setSelectedTime("");
        } else {
          setError("Hubo un problema al guardar el turno.");
        }
      } catch (err) {
        console.error("Error al guardar el turno:", err);
        setError("Hubo un problema al guardar el turno.");
      }
    }
  };

  const isDateUnavailable = (date: Dayjs) => {
    return (
      unavailableDatesProp.includes(date.format("YYYY-MM-DD")) ||
      date.isBefore(dayjs(), "day")
    );
  };

  const getAvailableTimes = (date: Dayjs | null) => {
    if (!date) return [];
    const occupiedTimes = occupiedTimesByDate[date.format("YYYY-MM-DD")] || [];
    return allTimes.filter((time) => !occupiedTimes.includes(time));
  };

  const availableTimes = getAvailableTimes(selectedDate);

  return (
    <div>
      {showSuccessCard ? (
        <Box
          sx={{
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
          }}
        >
          <Typography variant="h6" color="success">
            {successMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSuccessCard(false)}
            sx={{ marginTop: "16px" }}
          >
            Cerrar
          </Button>
        </Box>
      ) : (
        <>
          <TextField
            label="Nombre"
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Apellido"
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número de teléfono"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            fullWidth
            margin="normal"
            required
          />
          <DatePicker
            sx={{ width: "100%", marginTop: "16px" }}
            label="Selecciona una fecha"
            value={selectedDate}
            onChange={handleDateChange}
            shouldDisableDate={isDateUnavailable}
            slots={{ textField: TextField }}
          />
          {selectedDate && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="time-select-label">Selecciona un horario</InputLabel>
              <Select
                labelId="time-select-label"
                value={selectedTime}
                onChange={handleTimeChange}
                label="Selecciona un horario"
              >
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              fullWidth
            >
              Confirmar Turno
            </Button>
          </Box>
          {error && (
            <Typography color="error" variant="body2" mt={2}>
              {error}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default CustomDatePicker;
