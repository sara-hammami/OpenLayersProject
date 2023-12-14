const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const PORT = 3000;

// PostgreSQL connection settings
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'OpenLayersProject',
    password: 'pgadmin',
    port: 5432
});

const app = express();

// Use cors middleware to enable CORS
app.use(cors());
app.use(bodyParser.json());


/*
const setupScript = `
CREATE TABLE IF NOT EXISTS shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY
);`;

*/

const setupScript = `
CREATE TABLE IF NOT EXISTS point_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(Point, 4326)
  );

  CREATE TABLE IF NOT EXISTS line_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(LineString, 4326)
);


  CREATE TABLE IF NOT EXISTS polygons_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(Polygon, 4326)
  );
`;

// Run the setup script
pool.query(setupScript, (err) => {
    if (err) {
        console.error('Error setting up database:', err);
        pool.end();
    } else {
        console.log('Database setup successful');
    }
});

app.post('/store-zone-click', (req, res) => {
    const { featureType, geometry } = req.body;

    let tableName;
    switch (featureType) {
        case 'Point':
            tableName = 'point_shapes';
            break;
        case 'LineString':
            tableName = 'line_shapes';
            break;
        case 'Polygon':
            tableName = 'polygon_shapes';
            break;
        /*default:
            tableName = 'shapes';*/
    }

    const query = `
    INSERT INTO ${tableName} (feature_type, geometry)
    VALUES ($1, ST_GeomFromText($2, 4326))
    RETURNING id;
  `;

    pool.query(query, [featureType, geometry], (err, result) => {
        if (err) {
            console.error(`Error saving ${featureType} feature:`, err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(`${featureType} feature saved successfully with ID:`, result.rows[0].id);
            res.status(200).json({ id: result.rows[0].id });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




























/*
// Run the setup script
pool.query(setupScript, (err) => {
    if (err) {
        console.error('Error setting up database:', err);
        pool.end();
    } else {
        console.log('Database setup successful');
    }
});


// Handle preflight requests
app.options('/store-zone-click', cors());

// Endpoint to store zone click data
app.post('/store-zone-click', (req, res) => {
    const { featureType, geometry } = req.body;
    console.log(featureType)
    let tableName;
    switch (featureType) {
        case 'point':
            tableName = 'coordinates';
            break;
        case 'line':
            tableName = 'lines';
            break;
        case 'polygon':
            tableName = 'polygons';
            break;
        default:
            tableName = 'shapes';
    }

    const query = `
    INSERT INTO ${tableName} (feature_type, geometry)
    VALUES ($1, ST_GeomFromText($2, 4326))
    RETURNING id;
  `;

    pool.query(query, [featureType, geometry], (err, result) => {
        if (err) {
            console.error(`Error saving ${featureType} feature:`, err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(`${featureType} feature saved successfully with ID:`, result.rows[0].id);
            res.status(200).json({ id: result.rows[0].id });
        }
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/**
 * Created by Mandalorian on 05/12/2023.
 */
