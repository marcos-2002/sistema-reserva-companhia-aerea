import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Conectando ao WebSocket
        const socket = new WebSocket('ws://localhost:3000');

        // Evento quando a conexão for estabelecida
        socket.addEventListener('open', () => {
            console.log('Conectado ao servidor WebSocket');
        });

        // Evento para receber mensagens do servidor
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'NEW_RESERVATION') {
                setNotifications(prevNotifications => [
                    ...prevNotifications,
                    `Nova reserva criada para o voo ${data.reservation.flightId} por usuário ${data.reservation.userId}`
                ]);
            }
        });

        // Evento para detectar o fechamento da conexão
        socket.addEventListener('close', () => {
            console.log('Desconectado do servidor WebSocket');
        });

        // Limpeza ao desmontar o componente
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="notifications">
            <h2>Notificações</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
