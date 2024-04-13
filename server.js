const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Felhasználó modell definíciója
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Regisztrációs endpoint
app.post('/regisztracio', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Ellenőrizzük, hogy az e-mail cím már létezik-e az adatbázisban
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Ez az e-mail cím már regisztrálva van' });
        }

        // Ha az e-mail cím még nem létezik, létrehozzuk az új felhasználót
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Hiba a regisztráció során:', error);
        res.status(500).json({ success: false, error: 'Valami hiba történt a regisztráció során' });
    }
});

// Bejelentkezés endpoint
app.post('/bejelentkezes', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ellenőrizzük, hogy a felhasználó létezik-e az adatbázisban
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Hibás e-mail cím vagy jelszó' });
        }

        // Ellenőrizzük a jelszót
        if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Hibás e-mail cím vagy jelszó' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Hiba a bejelentkezés során:', error);
        res.status(500).json({ success: false, error: 'Valami hiba történt a bejelentkezés során' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`A szerver fut a ${PORT} porton`));
