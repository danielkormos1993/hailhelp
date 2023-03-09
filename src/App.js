import { ConfigProvider, theme } from 'antd';
import './kds/index.css';

import dayjs from "dayjs";
import { useState, useEffect } from 'react';
import { db } from "./modules/firebase";
import { collection, getDocs, query, orderBy, where, Timestamp } from "firebase/firestore";

import HailEvents from './components/HailEvents'
import Map from './components/Map'

export default function App(){

	const [data, setData] = useState(null);
    const [currentCountry, setCurrentCountry] = useState('all');
    const [timePeriod, setTimePeriod] = useState([dayjs().subtract(2, 'week'), dayjs()]);
	const [selectedMarker, setSelectedMarker] = useState(null);

	useEffect(() => {

        (async() => {

            if(!timePeriod) return

            let baseQuery = query(collection(db, 'hailevents'),
                orderBy('datetime', 'desc'),
                where('datetime', '>=', Timestamp.fromDate(timePeriod[0].toDate())),
                where('datetime', '<=', Timestamp.fromDate(timePeriod[1].toDate()))
            );

            if(currentCountry !== 'all'){
                baseQuery = query(baseQuery, where('country', '==', currentCountry))
            }

            const hailEvents = await getDocs(baseQuery);

            setData(hailEvents.docs.map(hailEvent => ({
                id: hailEvent.id,
                ...hailEvent.data()
            })))
        
        })()
        
    }, [currentCountry, timePeriod]);

  	return(

		<ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>

			<div className="kds-layout">

				<main>

					<section style={{paddingTop: 0}}>

						<Map data={data} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />

						<div className="kds-container" style={{paddingTop: 'var(--space-xxl)'}}>

							<HailEvents
								setCurrentCountry={setCurrentCountry}
								setTimePeriod={setTimePeriod}
								data={data}
								timePeriod={timePeriod}
								currentCountry={currentCountry}
								setSelectedMarker={setSelectedMarker}
							/>

						</div>

					</section>

				</main>

			</div>

		</ConfigProvider>
  	)

}