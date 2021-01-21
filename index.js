const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
const Kontak = require('./models/Kontak');
const PORT = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.authenticate()
	.then(() => console.log('berhasil terkoneksi ke database'))
	.catch((err) => console.log(err));

app.get('/daftar', async (req, res) => {
	try {
		const getAllKontak = await Kontak.findAll();
		res.json(getAllKontak);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

app.post('/buat', async (req, res) => {
	try {
		const { nama, hp, alamat } = req.body;
		const newKontak = new Kontak({
			nama,
			hp,
			alamat
		});

		await newKontak.save();
		res.json('berhasil menambahkan kontak');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

app.patch('/ubah/:id', async (req, res) => {
	try {
		const { nama, hp, alamat } = req.body;
		const { id } = req.params;

		await Kontak.update(
			{
				nama,
				hp,
				alamat
			},
			{
				where: { id }
			}
		);
		res.json('kontak berhasil diupdate');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

app.delete('/hapus/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await Kontak.destroy({
			where: { id }
		});
		res.json('berhasil dihapus');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

app.get('/', (req, res) => {
	res.send('respon berhasil');
});

app.listen(PORT, () => console.log(`Server berjalan di PORT ${PORT}`));
