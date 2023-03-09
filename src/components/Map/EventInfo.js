import { InfoWindowF } from "@react-google-maps/api";

export default function EventInfo({eventData, onCloseClick, Component}){

    return(
        <InfoWindowF
            position={{
                lat: eventData.coordinates.latitude,
                lng: eventData.coordinates.longitude
            }}
            onCloseClick={onCloseClick}
        >
            <Component data={eventData} />
        </InfoWindowF>
    )

}