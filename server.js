import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint to fetch matches
app.get('/api/matches', async (req, res) => {
    try {
        const response = await axios.get('https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249&per_page=10&paged=1');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching matches');
    }
});

// Endpoint to fetch squads by competition ID
app.get('/api/squads/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
        const response = await axios.get(`https://rest.entitysport.com/v2/competitions/${competitionId}/squads/?token=ec471071441bb2ac538a0ff901abd249`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching squads for competition ID ${competitionId}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
