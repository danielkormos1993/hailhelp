import { CircleF } from "@react-google-maps/api";

export default function EventCircle({eventData, onClick}){

    return(
        <CircleF
            center={{
                lat: eventData.coordinates.latitude,
                lng: eventData.coordinates.longitude
            }}
            radius={eventData.radius * 1000}
            onClick={onClick}
            options={{
                strokeColor: '#00FF00',
                fillColor: '#00FF00'
            }}
        />
    )

}