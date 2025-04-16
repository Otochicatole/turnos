'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Turno = {
  documentId: string;
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  date: string;
  time: string;
  statusT: boolean;
};

export default function TurnosList() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);

  const fetchTurnos = async () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) return;

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/turnos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (!data?.data) {
        console.error('Respuesta inesperada:', data);
        return;
      }

      const turnos = data.data.map((item: Turno) => ({
        documentId: item.documentId,
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        phoneNumber: item.phoneNumber,
        date: item.date,
        time: item.time,
        statusT: item.statusT,
      }));

      setTurnos(turnos);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar turnos:', err);
      setLoading(false);
    }
  };

  const confirmarTurno = async (documentId: string) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/turnos/${documentId}`,
        { data: { statusT: true } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.documentId === documentId ? { ...turno, statusT: true } : turno
        )
      );

      if (selectedTurno) {
        const whatsappMessage = `Hola *${selectedTurno.firstName}*,\n\nSu turno ha sido confirmado.\nFecha: _${selectedTurno.date}_\nHora: _${selectedTurno.time}_\n\nGracias por confiar en nosotros. Si tiene alguna consulta, no dude en escribirnos.`;
        const whatsappUrl = `https://wa.me/${selectedTurno.phoneNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`.replace(/%E2%80%8D/g, '');
        window.open(whatsappUrl, '_blank');
      }

      setShowModal(false);
      setSelectedTurno(null);
    } catch (err) {
      console.error('Error al confirmar el turno:', err);
    }
  };

  const handleConfirmClick = (turno: Turno) => {
    setSelectedTurno(turno);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (selectedTurno) {
      confirmarTurno(selectedTurno.documentId);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setSelectedTurno(null);
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const filteredTurnos = turnos
    .filter((turno) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        turno.firstName.toLowerCase().includes(search) ||
        turno.lastName.toLowerCase().includes(search) ||
        turno.phoneNumber.includes(search) ||
        turno.date.includes(search) ||
        turno.time.includes(search);

      if (filter === 'confirmados') {
        return matchesSearch && turno.statusT;
      }
      if (filter === 'sinConfirmar') {
        return matchesSearch && !turno.statusT;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filter === 'recientes') {
        return new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime();
      }
      if (filter === 'alfabetico') {
        return a.firstName.localeCompare(b.firstName);
      }
      if (filter === 'status') {
        return Number(b.statusT) - Number(a.statusT);
      }
      return 0;
    });

  if (loading) return <p className="p-8">Cargando turnos...</p>;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono, fecha u horario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-neutral-600 rounded-md w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-neutral-600 rounded-md bg-neutral-800 text-neutral-50"
        >
          <option value="">Sin filtro</option>
          <option value="confirmados">Confirmados</option>
          <option value="sinConfirmar">Sin confirmar</option>
        </select>
      </div>
      {filteredTurnos.length === 0 ? (
        <p className="text-neutral-400">No hay turnos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTurnos.map((turno) => (
            <li
              key={turno.id}
              className="p-4 bg-neutral-800 rounded-md shadow-md hover:bg-neutral-700"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-lg">
                    {turno.firstName} {turno.lastName}
                  </p>
                  <p className="text-neutral-400">Teléfono: {turno.phoneNumber}</p>
                  <p className="text-neutral-400">Fecha: {turno.date}</p>
                  <p className="text-neutral-400">Hora: {turno.time}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 justify-between ">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      turno.statusT
                        ? 'bg-green-500 text-neutral-50'
                        : 'bg-red-500 text-neutral-50'
                    }`}
                  >
                    {turno.statusT ? 'Confirmado' : 'Pendiente'}
                  </span>
                  {!turno.statusT && (
                    <button
                      onClick={() => handleConfirmClick(turno)}
                      className="bg-blue-600 text-neutral-50 px-3 py-1 rounded-md hover:bg-blue-500 cursor-pointer"
                    >
                      Confirmar
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && selectedTurno && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-2xl">
          <div className="bg-neutral-800 p-6 rounded-md shadow-md">
            <p>¿Estás seguro de que deseas confirmar el turno?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleModalCancel}
                className="px-4 py-2 bg-red-700 rounded-md hover:bg-red-600 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}