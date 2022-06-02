import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const EditDonasi = () => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState('');
  const [gambar_exist, setGambarExist] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kontak, setKontak] = useState('');
  const [website, setWebsite] = useState('');
  const [rekening, setRekening] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getDonasiById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_HOST}/auth/token`);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  }

  const updateDonasi = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('gambar', gambar);

    let dataDonasi = {
      nama: nama,
      deskripsi: deskripsi,
      lokasi: lokasi,
      kontak: kontak,
      website: website,
      rekening: rekening
    };

    formData.append('data', JSON.stringify(dataDonasi));

    try {
      await axios.put(`${REACT_APP_BACKEND_HOST}/donasi/${id}`, formData);
      navigate("/donasi");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  const getDonasiById = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_HOST}/donasi/${id}`);
      setNama(response.data.nama);
      setDeskripsi(response.data.deskripsi);
      if (response.data.gambar) setGambarExist(response.data.gambar);
      setLokasi(response.data.lokasi);
      setKontak(response.data.kontak);
      setWebsite(response.data.website);
      setRekening(response.data.rekening);
    } catch (error) {
      if (error.response) {
        navigate("/donasi");
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <Link to="/donasi" className="button is-default mb-5"><span className="file-icon">
        <i className="fa fa-arrow-left"></i>
      </span>Kembali</Link>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Data Donasi</h1>
          <form encType="multipart/form-data" onSubmit={updateDonasi}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Deskripsi (Opsional)</label>
              <div className="control">
                <textarea className="textarea" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}></textarea>
              </div>
            </div>
            {gambar_exist ? (
              <figure className="image is-horizontal-center"><img style={{ width: '200px' }} src={gambar_exist} alt={nama} /></figure>
            ) : ('')}
            <div className="field">
              <label className="label">Gambar (Opsional)</label>
              <div className="control">
                <div className="file has-name">
                  <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={(e) => setGambar(e.target.files[0])} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Pilih file…
                      </span>
                    </span>
                    <span className="file-name">{(gambar.name || 'Belum dipilih')}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Lokasi</label>
              <div className="control">
                <input type="text" className="input" placeholder="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Kontak</label>
              <div className="control">
                <input type="text" className="input" placeholder="Kontak" value={kontak} onChange={(e) => setKontak(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Website</label>
              <div className="control">
                <input type="text" className="input" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Rekening</label>
              <div className="control">
                <input type="text" className="input" placeholder="Rekening" value={rekening} onChange={(e) => setRekening(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success"><span className="file-icon">
                <i className="fa fa-check"></i>
              </span>Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditDonasi
