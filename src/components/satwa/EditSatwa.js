import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const EditSatwa = () => {
  const [nama, setNama] = useState('');
  const [nama_saintifik, setNamaSaintifik] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [populasi, setPopulasi] = useState('');
  const [funfact, setFunfact] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getSatwaById();
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

  const updateSatwa = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${REACT_APP_BACKEND_HOST}/satwa/${id}`, {
        nama,
        nama_saintifik,
        lokasi,
        populasi,
        funfact
      });
      navigate("/satwa");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  const getSatwaById = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_HOST}/satwa/${id}`);
      setNama(response.data.nama);
      setNamaSaintifik(response.data.nama_saintifik);
      setLokasi(response.data.lokasi);
      setPopulasi(response.data.populasi);
      setFunfact(response.data.funfact);
    } catch (error) {
      if (error.response) {
        navigate("/satwa");
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <Link to="/satwa" className="button is-default mb-5"><span className="file-icon">
        <i className="fa fa-arrow-left"></i>
      </span>Kembali</Link>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Data Satwa</h1>
          <form onSubmit={updateSatwa}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Nama Saintifik (Opsional)</label>
              <div className="control">
                <input className="input" placeholder="Nama Saintifik" value={nama_saintifik} onChange={(e) => setNamaSaintifik(e.target.value)}></input>
              </div>
            </div>
            <div className="field">
              <label className="label">Lokasi (Opsional)</label>
              <div className="control">
                <input type="text" className="input" placeholder="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Populasi (Opsional)</label>
              <div className="control">
                <input type="text" className="input" placeholder="Populasi" value={populasi} onChange={(e) => setPopulasi(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Fun Facts (Opsional)</label>
              <div className="control">
                <textarea type="text" className="textarea" placeholder="Fun Facts" value={funfact} onChange={(e) => setFunfact(e.target.value)} ></textarea>
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

export default EditSatwa
