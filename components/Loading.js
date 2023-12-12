import { memo } from 'react';

const Loading = ({ full }) => {
    return (
        <div className={`${full ? 'full' : ""} loading`} >
            <svg width={full ? 200 : 50} height={full ? 200 : 50}>
                <circle
                    fill="transparent"
                    stroke='var(--secondary)'
                    r={full ? 50 : 12.5}
                    cx={full ? 100 : 25}
                    cy={full ? 100 : 25}
                    strokeWidth={full ? 10 : 5 + "px"}
                ></circle>
            </svg>
        </div >
    )
}

export default memo(Loading);