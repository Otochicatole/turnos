"use client";
import CustomDatePicker from "@/components/common/date-picker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motion } from "framer-motion";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import axios from "axios";

type Turno = {
  documentId: string;
  id: number;
  time: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  date?: string;
  statusT?: boolean;
};

type CasaHorario = {
  id: string;
  time: string;
};

type BarberHorario = {
  id: string;
  time: string;
};

export default function Page() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [casaHorarios, setCasaHorarios] = useState<CasaHorario[]>([]);
  const [barberHorarios, setBarberHorarios] = useState<BarberHorario[]>([]);
  const [value, setValue] = React.useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchTurnos = async () => {
      const token = process.env.NEXT_PUBLIC_API_TOKKEN;

      if (!token) {
        console.error("API_TOKKEN no está definido");
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/turnos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (!data?.data) {
          console.error("Respuesta inesperada:", data);
          return;
        }

        const turnos = data.data.map((item: Turno) => ({
          documentId: item.documentId,
          id: item.id,
          time: item.time,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          publishedAt: item.publishedAt,
          firstName: item.firstName,
          lastName: item.lastName,
          phoneNumber: item.phoneNumber,
          date: item.date,
          statusT: item.statusT,
        }));

        setTurnos(turnos);
      } catch (err) {
        console.error("Error al cargar turnos:", err);
      }
    };
    fetchTurnos();
  }, []);

  useEffect(() => {
    const fetchCasaHorarios = async () => {
      const token = process.env.NEXT_PUBLIC_API_TOKKEN;

      if (!token) {
        console.error("API_TOKKEN no está definido");
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/casa-horarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (!data?.data) {
          console.error("Respuesta inesperada:", data);
          return;
        }

        const times = data.data.map((item: CasaHorario) => ({
          id: item.id,
          time: item.time,
        }));

        setCasaHorarios(times);
      } catch (err) {
        console.error("Error al cargar horarios:", err);
      }
    };
    fetchCasaHorarios();
  }, []);

  useEffect(() => {
    const fetchBarberHorarios = async () => {
      const token = process.env.NEXT_PUBLIC_API_TOKKEN;

      if (!token) {
        console.error("API_TOKKEN no está definido");
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/barber-horarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (!data?.data) {
          console.error("Respuesta inesperada:", data);
          return;
        }

        const times = data.data.map((item: BarberHorario) => ({
          id: item.id,
          time: item.time,
        }));

        setBarberHorarios(times);
      } catch (err) {
        console.error("Error al cargar horarios:", err);
      }
    };
    fetchBarberHorarios();
  }, []);

  useEffect(() => {
    const fetchFechasOcupadas = async () => {
      const token = process.env.NEXT_PUBLIC_API_TOKKEN;

      if (!token) {
        console.error("API_TOKKEN no está definido");
        return;
      }

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fechas-ocupadas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (!data?.data) {
          console.error("Respuesta inesperada:", data);
          return;
        }

        const fechasOcupadas = data.data.map((item: { date: string }) => item.date);

        setUnavailableDates(fechasOcupadas);
      } catch (err) {
        console.error("Error al cargar fechas ocupadas:", err);
      }
    };

    fetchFechasOcupadas();
  }, []);

  const turnosFiltered = turnos.filter((turno) => turno.statusT === true);

  const turnosGroupedByDate = turnosFiltered.reduce((acc, turno) => {
    if (!acc[turno.date!]) {
      acc[turno.date!] = [];
    }
    acc[turno.date!].push(turno.time);
    return acc;
  }, {} as Record<string, string[]>);

  const turnosGroupedArray = Object.entries(turnosGroupedByDate).map(
    ([date, times]) => ({
      date,
      times,
    })
  );

  const filteredTurnos = turnosFiltered.filter((turno) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (turno.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        turno.lastName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        turno.time?.includes(lowerCaseSearchTerm) ||
        turno.date?.includes(lowerCaseSearchTerm)) ?? false
    );
  });

  return (
    <div className="flex flex-col py-20">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        Turnos
      </motion.h1>
      <motion.h1
        className="text-lg text-gray-300 mt-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        Asegurate de seleccionar el lugar correcto
      </motion.h1>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col w-full items-center mt-10 justify-center"
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="lg:ml-10"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Casa" value="1" />
                <Tab label="Barberia" value="2" />
                <Tab label="Turnos Confirmados" value="3" />
              </TabList>
            </Box>
            <TabPanel
              className="flex flex-col items-center justify-center  bg-[url(/casa.png)] bg-cover px-40"
              value="1"
            >
              <div className="p-3 w-full max-w-xl bg-black/80 backdrop-blur-sm rounded-sm shadow-md">
                <h1 className="text-3xl">Casa</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomDatePicker
                    unavailableDatesProp={[
                      ...unavailableDates,
                      ...Object.entries(turnosGroupedByDate).reduce(
                        (acc, [date, times]) => {
                          const allTimesOccupied = casaHorarios.every(
                            (horario) => times.includes(horario.time.slice(0, 5))
                          );
                          if (allTimesOccupied) {
                            acc.push(date);
                          }
                          return acc;
                        },
                        [] as string[]
                      ),
                    ]}
                    occupiedTimesByDate={turnosGroupedArray.reduce(
                      (acc, { date, times }) => {
                        acc[date] = times;
                        return acc;
                      },
                      {} as Record<string, string[]>
                    )}
                    allTimes={casaHorarios.map((horario) =>
                      horario.time.slice(0, 5)
                    )}
                  />
                </LocalizationProvider>
              </div>
            </TabPanel>
            <TabPanel
              className="flex flex-col items-center justify-center bg-[url(/img.jpg)] bg-cover bg-center"
              value="2"
            >
              <div className="p-3 w-full max-w-xl bg-black/80 backdrop-blur-sm rounded-sm shadow-md">
                <h1 className="text-3xl">Barberia</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomDatePicker
                    unavailableDatesProp={[
                      ...unavailableDates,
                      ...Object.entries(
                        turnosGroupedByDate
                      ).reduce((acc, [date, times]) => {
                        const allTimesOccupied = barberHorarios.every(
                          (horario) => times.includes(horario.time.slice(0, 5))
                        );
                        if (allTimesOccupied) {
                          acc.push(date);
                        }
                        return acc;
                      }, [] as string[]),
                    ]}
                    occupiedTimesByDate={turnosGroupedArray.reduce(
                      (acc, { date, times }) => {
                        acc[date] = times;
                        return acc;
                      },
                      {} as Record<string, string[]>
                    )}
                    allTimes={barberHorarios.map((horario) =>
                      horario.time.slice(0, 5)
                    )}
                  />
                </LocalizationProvider>
              </div>
            </TabPanel>
            <TabPanel
              className="flex flex-col items-center justify-center"
              value="3"
            >
              <div className="p-3 w-full backdrop-blur-sm rounded-sm">
                <h1 className="text-3xl">Turnos Confirmados</h1>
                {/* Barra de búsqueda */}
                <input
                  type="text"
                  placeholder="Buscar por nombre, hora o fecha"
                  className="mt-4 p-2 w-full max-w-md border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredTurnos.length > 0 && (
                  <div className="mt-10 w-full backdrop-blur-sm rounded-sm">
                    <ul className="mt-4 space-y-2">
                      {filteredTurnos.map((turno) => (
                        <div
                          key={turno.documentId}
                          className="flex flex-row justify-between items-center text-gray-300 p-4 bg-neutral-800 rounded-md hover:bg-neutral-700"
                        >
                          <div className="flex flex-col">
                            <p className="text-xl text-blue-300">
                              {turno.firstName} {turno.lastName}
                            </p>
                            Fecha: {turno.date} <br />
                            Hora: {turno.time} <br />
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm ${turno.statusT
                              ? "bg-green-500 text-neutral-50"
                              : "bg-red-500 text-neutral-50"
                              }`}
                          >
                            {turno.statusT ? "Confirmado" : "Pendiente"} N-{turno.id}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </motion.section>
    </div>
  );
}
