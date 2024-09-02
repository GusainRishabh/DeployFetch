import React, { useState } from 'react';
import axios from 'axios';

const SquadDisplay = () => {
    const [competitionId, setCompetitionId] = useState('');
    const [squads, setSquads] = useState(null);
    const [error, setError] = useState('');

    const fetchSquads = async () => {
        try {
            const response = await axios.get(`https://rest.entitysport.com/v2/competitions/${competitionId}/squads/?token=ec471071441bb2ac538a0ff901abd249`);
            setSquads(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching squads. Please check the competition ID and try again.');
            setSquads(null);
        }
    };

    const containerStyle = {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px',
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '15px',
        margin: '20px 0',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '100%',
        padding: '15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginBottom: '30px',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const errorStyle = {
        color: '#ff4d4d',
        fontSize: '0.9rem',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const squadListStyle = {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    };

    const teamStyle = {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    };

    const teamHoverStyle = {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };

    const playerStyle = {
        marginLeft: '15px',
        padding: '5px 0',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Squad Display</h1>
            <input
                type="text"
                value={competitionId}
                onChange={(e) => setCompetitionId(e.target.value)}
                placeholder="Enter Competition ID"
                style={inputStyle}
            />
            <button
                onClick={fetchSquads}
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
                Fetch Squads
            </button>

            {error && <p style={errorStyle}>{error}</p>}

            {squads && (
                <div>
                    <h2 style={headerStyle}>Squads</h2>
                    <ul style={squadListStyle}>
                        {squads.response.squads.map((team) => (
                            <li
                                key={team.team_id}
                                style={teamStyle}
                                onMouseOver={(e) => (e.currentTarget.style.transform = teamHoverStyle.transform)}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = teamStyle.transform;
                                    e.currentTarget.style.boxShadow = teamStyle.boxShadow;
                                }}
                            >
                                <h3>{team.name}</h3>
                                <ul style={squadListStyle}>
                                    {team.players.map((player) => (
                                        <li key={player.pid} style={playerStyle}>{player.title}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SquadDisplay;
