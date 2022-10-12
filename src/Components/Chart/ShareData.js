import React from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { NewUrl } from './ChartDatapass'
const ShareData = ({ userIdentify, pathLocation }) => {
    const [copyLink, setcopyLink] = useState(false)
    return (
        <div className='w-[200px]  absolute -top-0 right-5 flex justify-between items-center'>
            <div>
                <a href={`/${pathLocation}/?user=${NewUrl()}`} target="_blank" className="px-3 py-2 bg-green-500 text-white font-medium  rounded shadow-md text-xs">Create url</a>
            </div>
            <div>
                <CopyToClipboard text={`https://graphi-154a5.web.app/${pathLocation}/?user=${userIdentify}`}>
                    <button onClick={() => setcopyLink(true)} className={`px-3 py-2 ${copyLink ? 'bg-red-500' : 'bg-green-500'}  text-white font-medium  rounded shadow-md text-xs`}>Copy url</button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default ShareData