import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249&per_page=10&paged=1');
        setMatches(response.data.response.items);
        setLoading(false);
      } catch (err) {
        setError('Error fetching matches. Please try again later.');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0'
  };

  const itemStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9'
  };

  const imgStyle = {
    verticalAlign: 'middle',
    borderRadius: '50%',
    margin: '0 10px',
    width: '50px',
    height: '50px'
  };

  const detailsStyle = {
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1>Matches</h1>
      <ul style={listStyle}>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {matches.length > 0 ? (
          matches.map((match) => (
            <li key={match.match_id} style={itemStyle}>
              <h2>Match ID: {match.match_id}</h2>
              <h3>{match.short_title || 'No title'} - {match.subtitle || 'No subtitle'}</h3>
              <p>Status: {match.status_note || 'No status'}</p>
              <p>
                <img src={match.teama?.logo_url} alt={match.teama?.name || 'Team A'} style={imgStyle} />
                {match.teama?.name || 'Team A'} vs
                <img src={match.teamb?.logo_url} alt={match.teamb?.name || 'Team B'} style={imgStyle} />
                {match.teamb?.name || 'Team B'}
              </p>
              <div style={detailsStyle}>
                <p>Competition: {match.competition?.title || 'No competition'}</p>
                <p>Venue: {match.venue?.name || 'No venue'}, {match.venue?.location || 'No location'}</p>
                <p>Result: {match.result || 'No result'}</p>
                <p>Date: {new Date(match.date_start).toLocaleString() || 'No date'}</p>
                <p>Umpires: {match.umpires || 'No umpires'}</p>
                <p>Referee: {match.referee || 'No referee'}</p>
              </div>
            </li>
          ))
        ) : (
          <li>No matches found</li>
        )}
      </ul>
    </div>
  );
};

export default Matches;
