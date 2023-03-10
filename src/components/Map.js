import { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Spin } from 'antd';
import createStyle from '../kds/libs/createStyle';

import HailEvent from './HailEvent';
import EventCircle from './Map/EventCircle';
import EventInfo from './Map/EventInfo';
import { useEffect } from 'react';

createStyle(`
    .gm-style, .gm-style-iw{
        font: inherit !important;
        font-weight: inherit !important;
        font-size: inherit !important;
    }
    .gm-style-iw{
        max-width: none !important;
    }
    .gm-style .kds-card{
        min-width: 280px;
    }
`);

const initialCenter = {
    lat: 46.511667,
    lng: 18.316667
}

const setInitialZoom = (mapInstance) => {

    if(window.matchMedia("(max-width: 768px)").matches){

        mapInstance.setZoom(3);

    } else mapInstance.setZoom(5);

}

export default function Map({data, selectedMarker, setSelectedMarker}){

    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {

        if(selectedMarker && mapInstance){

            mapInstance.setCenter({
                lat: selectedMarker.coordinates.latitude,
                lng: selectedMarker.coordinates.longitude,
            });

            const currentZoom = mapInstance.getZoom();

            mapInstance.setZoom(Math.max(currentZoom, 7.2));

        }

    }, [selectedMarker, mapInstance]);

    useEffect(() => {

        if(mapInstance) setInitialZoom(mapInstance)

    }, [mapInstance]);

    const { isLoaded } = useJsApiLoader({
        mapIds: ['10f4833de58f083e'],
        googleMapsApiKey: "AIzaSyAVihfYrar6sIJFyn7CP-zP3uyRn8-4-us"
    });

    return(

        <div style={{
            width: '100%',
            height: '80vh',
            backgroundColor: 'var(--color-grey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {isLoaded ? 

                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={initialCenter}
                    onLoad={(mapInstance) => setMapInstance(mapInstance)}
                    options={{
                        mapId: "10f4833de58f083e",
                        disableDefaultUI: true,
                        zoomControl: true
                    }}
                >

                    {data && data.map((item) =>
                        <EventCircle
                            key={item.id}
                            eventData={item}
                            onClick={() => setSelectedMarker(item)}
                        />
                    )}

                    {selectedMarker && (
                        <EventInfo
                            eventData={selectedMarker}
                            onCloseClick={() => setSelectedMarker(null)}
                            Component={HailEvent}
                        />
                    )}

                </GoogleMap> : <Spin />
            }
        </div>
    )

}