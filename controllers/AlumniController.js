// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    try {
      // memanggil method static all dengan async await.
      const lulusan = await Alumni.all();

      const data = {
        message: "Menampilkan semua alumni",
        data: lulusan,
      };

      res.json(data);
    } catch (err) {
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data alumni",
        error: err.message,
      });
    }
  }

  async store(req, res) {
    /**
     * TODO 2: memanggil method create.
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     */
    // code here
    try {
      const { nama, hp, alamat, tahunLulus, status, perusahaan, jabatan } = req.body;
  
      if (!nama || nama.trim() === "") {
        return res.status(400).json({
          message: "Kolom 'nama' wajib diisi",
        });
      }
  
      const lulusan = await Alumni.create({ nama, hp, alamat, tahunLulus, status, perusahaan, jabatan });
  
      res.json({
        message: "Menambahkan alumni berhasil",
        data: lulusan, // Data mahasiswa yang baru ditambahkan
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat menambahkan lulusan",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { nama, hp, alamat, tahunLulus, status, perusahaan, jabatan } = req.body;

    try {
      const alumni = await Alumni.update(id, { nama, hp, alamat, tahunLulus, status, perusahaan, jabatan });
      
      if (!alumni) {
        return res.status(404).json({
          message: "Alumni tidak ditemukan",
        });
      }

      res.json({
        message: "Alumni berhasil diperbarui",
        data: alumni,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat memperbarui alumni",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const alumni = await Alumni.delete(id);

      if (!alumni) {
        return res.status(404).json({
          message: "Alumni tidak ditemukan",
        });
      }

      res.json({
        message: "Alumni berhasil dihapus",
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat menghapus alumni",
        error: error.message,
      });
    }
  }

  static async delete(id) {
    const query = `DELETE FROM alumni WHERE id = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (result.affectedRows === 0) {
        return null; // Jika tidak ada alumni yang dihapus
      }

      return true; // Alumni berhasil dihapus
    } catch (err) {
      throw new Error("Gagal menghapus alumni: " + err.message);
    }
  }

  async show(req, res) {
    const id = req.params.id;

    try {
      const alumni = await Alumni.findById(id);

      if (!alumni) {
        return res.status(404).json({
          message: "Alumni tidak ditemukan",
        });
      }

      res.json({
        message: "Menampilkan alumni",
        data: alumni,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data alumni",
        error: error.message,
      });
    }
  }

  async search(req, res) {
    const { nama, tahunLulus, status } = req.query;

    try {
      const query = {};

      if (nama) query.nama = { $regex: new RegExp(nama, 'i') }; // Pencarian nama menggunakan regex
      if (tahunLulus) query.tahunLulus = tahunLulus;
      if (status) query.status = status;

      const alumni = await Alumni.find(query);

      res.json({
        message: "Hasil pencarian alumni",
        data: alumni,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mencari alumni",
        error: error.message,
      });
    }
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;