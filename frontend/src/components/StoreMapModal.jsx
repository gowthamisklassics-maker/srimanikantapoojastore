import React from 'react';
import { useStore } from '../services/storeContext';

export default function StoreMapModal() {
  const { isStoreMapOpen, setIsStoreMapOpen, storeInfo } = useStore();

  if (!isStoreMapOpen) return null;

  const close = () => setIsStoreMapOpen(false);

  return (
    <div
      className="map-modal-backdrop open"
      onClick={(e) => e.target.classList.contains('map-modal-backdrop') && close()}
    >
      <div className="map-modal-box">
        <div className="map-modal-header">
          <h3>
            <i className="fas fa-map-marker-alt"></i> Visit Our Store
          </h3>
          <button className="map-modal-close" onClick={close} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="map-modal-body">
          <iframe
            src={storeInfo.mapEmbed}
            width="100%"
            height="380"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Manikanta Pooja Stores Map"
          ></iframe>
          <div className="map-modal-info">
            <p>
              <i className="fas fa-map-marker-alt"></i> {storeInfo.address}
            </p>
            <a
              href={storeInfo.mapLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
              style={{ marginTop: '10px' }}
            >
              <i className="fas fa-directions"></i> Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
