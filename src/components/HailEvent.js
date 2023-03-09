import dayjs from "dayjs";

export default function HailEvent({data, onClick}){

    // const onHailEventClick = e => {
    //     alert('not implemented yet')
    //     // style={{cursor: 'pointer'}} onClick={onHailEventClick}
    // }

    const dateTime = dayjs(data.datetime.toDate()).format('YYYY-MM-DD, HH:mm');

    return(

        <div className="kds-card" onClick={onClick}>

            <div className="kds-card_body">

                <span className="size-xxs" style={{color: 'var(--color-tertiary-text)'}}>{dateTime}</span>

                <h2 className="size-m">{data.city}, {data.country}</h2>

                <span style={{
                    color: 'var(--color-tertiary-text)',
                    fontStyle: 'italic'
                }} className="size-xxs">{">"} {data.radius} km</span>

            </div>

            <div className="kds-card_footer">

                <div className="flex wrap" style={{gap: 'var(--space-s)'}}>

                    <span style={{color: 'var(--color-secondary-text)'}}>Hail size:</span>

                    <b>{data.size} cm</b>

                </div>

                <div className="flex wrap" style={{gap: 'var(--space-s)', rowGap: 0}}>

                    <span style={{color: 'var(--color-secondary-text)'}}>Media:</span>

                    {!data.images ? "-" : (data.images.map((imageLink, index) => (

                        <a
                            key={imageLink}
                            className="link"
                            onClick={e => e.stopPropagation()}
                            target="_blank"
                            rel="noreferrer"
                            href={imageLink} 
                        >

                                {index + 1}

                        </a>

                    )))}

                </div>

            </div>

        </div>
    )

}