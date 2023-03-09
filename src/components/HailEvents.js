import HailEvent from "./HailEvent"
import { Spin, DatePicker, Select, Divider } from "antd";
import countries from "../data/countries";

const countriesOptions = countries.map(country => {
    return {
        label: country,
        value: country
    }
})

const { RangePicker } = DatePicker;

export default function HailEvents({setCurrentCountry, setTimePeriod, data, timePeriod, currentCountry, setSelectedMarker}){

    return(

        <div className="kds-stack" style={{gap: 'var(--space-xl)'}}>

            <div className="kds-stack" style={{gap: 0}}>

                <div className="flex align-items-center" style={{gap: 'var(--space-m)'}}>

                    <h1 className="display size-l">Hail events in Europe</h1>

                    {!data && <Spin />}

                </div>

                <Divider style={{borderColor: 'var(--color-tertiary-text)'}} />

                <div className="kds-grid">

                    <div className="kds-stack" style={{gap:0}}>

                        <span className="info size-xxs">Time period {"(last 2 weeks by default)"}</span>

                        <RangePicker
                            showTime
                            defaultValue={timePeriod}
                            format="YYYY-MM-DD, HH:mm"
                            onChange={(value) => setTimePeriod(value)}
                        />

                    </div>

                    <div className="kds-stack" style={{gap:0}}>

                        <span className="info size-xxs">Country</span>

                        <Select
                            showSearch
                            placeholder="Select country"
                            optionFilterProp="label"
                            defaultValue={currentCountry}
                            onChange={(value) => setCurrentCountry(value)}
                            filterOption={(input, option) =>
                                (option?.label || '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[{
                                value: 'all',
                                label: 'All country'
                            },
                            ...countriesOptions
                            ]}
                        />

                    </div>

                </div>

            </div>

            {data && 

                <div className="kds-stack" style={{gap: 'var(--space-s)'}}>

                    <span className="info">{data.length} result</span>

                    <div className="kds-grid" id="hail-events-list">

                        {data.map(hailEvent => 
                            <HailEvent
                                key={hailEvent.id}
                                data={hailEvent}
                                onClick={() => {
                                    setSelectedMarker(hailEvent);
                                    window.scrollTo(0, 0)
                                }}
                            />
                        )}

                    </div>

                </div>

            }

        </div>

    )

}