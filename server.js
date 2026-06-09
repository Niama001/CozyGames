// Create a web server (Express)
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// DATA (games array)
const games = [
  {
    slug: "stardew-valley",
    title: "Stardew Valley",
    genre: "Farming / Life Sim",
    platform: "PC, Switch, PlayStation, Xbox",
    description: "Build your farm, raise animals, mine, fish, and build relationships in a peaceful countryside town.",
    image: "/images/stardewValley.jpeg"
  },
  {
    slug: "paralives",
    title: "Paralives",
    genre: "Life Simulation (Upcoming)",
    platform: "PC (Early Access planned)",
    description: "A highly anticipated life sim focused on creativity, customization, and open-ended storytelling.",
    image: "/images/paralives.jpg"
  },
  {
    slug: "inzoi",
    title: "InZoi",
    genre: "Life Simulation (Upcoming)",
    platform: "PC",
    description: "A realistic life simulation game with detailed character customization and city living systems.",
    image: "/images/inzoi.jpg"
  },
  {
    slug: "coral-island",
    title: "Coral Island",
    genre: "Farming / Life Sim",
    platform: "PC, Xbox, PlayStation",
    description: "A vibrant farming game focused on restoring a tropical island and building relationships.",
    image: "/images/coralIsland.jpeg"
  },
  {
    slug: "tomodachi-life",
    title: "Tomodachi Life",
    genre: "Life Simulation",
    platform: "Nintendo 3DS",
    description: "Create Mii characters and watch their funny, unpredictable island lives unfold.",
    image: "/images/tomodachiLife.jpeg"
  }
];


// STATIC FILES
app.use(express.static('public'));

// Create routes and request handlers
// HOME ROUTE
app.get('/', (req, res) => {
  const gameCards = games.map(game => {
    return `
      <article>
        <img src="${game.image}" alt="${game.title}" style="border-radius:12px; max-height:180px; object-fit:cover; width:100%;" />

        <h3>${game.title}</h3>

        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Platform:</strong> ${game.platform}</p>

        <p style="opacity:0.8">${game.description}</p>

        <a href="/games/${game.slug}" role="button">
          View Details →
        </a>
      </article>
    `;
  }).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cozy Video Games</title>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">

      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.2rem;
          margin-top: 2rem;
        }

        article {
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: transform 0.15s ease-in-out;
        }

        article:hover {
          transform: translateY(-5px);
        }

        h1 {
          text-align: center;
        }

        p {
          margin-bottom: 0.5rem;
        }
      </style>
    </head>

    <body>
      <main class="container">
        <h1>🎮 Cozy Video Games</h1>
        <p style="text-align:center;">Relaxing games to unwind after long day</p>

        <div class="grid">
          ${gameCards}
        </div>
      </main>
    </body>
    </html>
  `);
});

// LIST ROUTE 
app.get('/games', (req, res) => {
  res.send(games);
});

// DETAIL ROUTE
app.get('/games/:slug', (req, res) => {
  const game = games.find(g => g.slug === req.params.slug);

  if (!game) {
    return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  }

  const getGenreClass = (genre) => {
  if (genre.toLowerCase().includes("farming")) return "farming";
  if (genre.toLowerCase().includes("life")) return "life";
  return "default";
  };

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${game.title}</title>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">

      <style>
        body {
        animation: fadeIn 0.25s ease-in;
        }

        @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }
        .detail-card {
          max-width: 700px;
          margin: 2rem auto;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .game-img {
          width: 100%;
          max-height: 350px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .meta {
          display: grid;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .back {
          display: inline-block;
          margin-top: 1.5rem;
        }

        h1 {
          margin-bottom: 0.5rem;
        }

        .tag {
        display: inline-block;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        font-size: 0.8rem;
        margin-right: 0.5rem;
        color: white;
        }

        /* Genre colors */
        .farming {
        background: #2e7d32; /* green */
        }

        .life {
        background: #1565c0; /* blue */
        }

        .default {
        background: #616161;
        }
      </style>
    </head>

    <body>
      <main class="container">
        <div class="detail-card">

          <img src="${game.image}" class="game-img" alt="${game.title}" />

          <h1>${game.title}</h1>

          <div>
            <span class="tag ${getGenreClass(game.genre)}">${game.genre}</span>
            <span class="tag">${game.platform}</span>
          </div>

          <div class="meta">
            <p><strong>Description:</strong></p>
            <p>${game.description}</p>
          </div>

          <a href="/" role="button" class="back">← Back to Games</a>

        </div>
      </main>
    </body>
    </html>
  `);
});
// 404 HANDLER 
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});