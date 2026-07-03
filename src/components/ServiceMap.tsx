'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { getSite, getServiceAreas } from '@/data';

// Coordinates for the 10 dedicated city service pages and the shop location.
// Sourced from public data; used only for the interactive service-area map.
const CITY_COORDS: Record<string, [number, number]> = {
  'Cooper City': [26.062, -80.2717],
  'Coral Springs': [26.2712, -80.2706],
  'Davie': [26.0765, -80.2521],
  'Hollywood': [26.0112, -80.1495],
  'Miramar': [25.9873, -80.2323],
  'Pembroke Pines': [26.0079, -80.2963],
  'Plantation': [26.1275, -80.2331],
  'Sunrise': [26.133, -80.287],
  'Tamarac': [26.2129, -80.2497],
  'Weston': [26.1004, -80.3998],
  'Ft. Lauderdale': [26.1224, -80.1373],
  'Southwest Ranches': [26.06, -80.35],
};

// Defensive: replace Leaflet's default icon (which resolves to relative PNG
// paths that 404 under a bundler) with an inline divIcon. Every marker in
// this map uses an explicit icon or CircleMarker, but this guarantees that
// any future <Marker> added without an icon prop still renders.
L.Marker.prototype.options.icon = L.divIcon({
  className: 'ss-marker-default',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#3D6BA8;border:2px solid #0F1F3A"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Custom sunshine-orange marker for the HQ pin so it stands out from the
// dumpster / service circle markers.
const hqIcon = L.divIcon({
  className: '',
  html: `<div style="width:22px;height:22px;border-radius:50%;background:#F58A0A;border:3px solid #0F1F3A;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function ServiceMap({ height = 460 }: { height?: number }) {
  const site = getSite();
  const areas = getServiceAreas();

  return (
    <div style={{ height }} className="w-full">
      <MapContainer
        center={[26.15, -80.28]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full rounded-3xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Service-city markers */}
        {areas.serviceAreaPages.map((c) => {
          const coords = CITY_COORDS[c.city];
          if (!coords) return null;
          return (
            <CircleMarker
              key={c.slug}
              center={coords}
              radius={9}
              pathOptions={{ color: '#0F1F3A', weight: 2, fillColor: '#F58A0A', fillOpacity: 0.9 }}
            >
              <Popup>
                <strong>{c.city}, FL</strong>
                <br />
                Junk removal service area
                <br />
                <Link href={c.slug} style={{ color: '#0F1F3A', fontWeight: 600 }}>
                  See {c.city} page →
                </Link>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Dumpster-only city markers not already covered above */}
        {areas.dumpsterRentalPages
          .filter((d) => !areas.serviceAreaPages.some((s) => s.city === d.city))
          .map((c) => {
            const coords = CITY_COORDS[c.city];
            if (!coords) return null;
            return (
              <CircleMarker
                key={c.slug}
                center={coords}
                radius={7}
                pathOptions={{ color: '#0F1F3A', weight: 2, fillColor: '#3D6BA8', fillOpacity: 0.85 }}
              >
                <Popup>
                  <strong>{c.city}, FL</strong>
                  <br />
                  Dump trailer rentals
                  <br />
                  <Link href={c.slug} style={{ color: '#0F1F3A', fontWeight: 600 }}>
                    See {c.city} dumpsters →
                  </Link>
                </Popup>
              </CircleMarker>
            );
          })}

        {/* HQ marker */}
        <Marker
          position={[site.geo.lat, site.geo.lng]}
          icon={hqIcon}
        >
          <Popup>
            <strong>{site.shortName}</strong>
            <br />
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            <a href={`tel:${site.phone}`} style={{ color: '#0F1F3A', fontWeight: 600 }}>
              {site.phoneDisplay}
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
