import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { NewUrl } from './ChartDatapass'
const ShareData = ({userIdentify,pathLocation}) => {
    return (
        <div className='w-[200px] bg-red-400 absolute -top-0 right-5 flex justify-between items-center'>
            <div>
                <a href={`/${pathLocation}/?user=${NewUrl()}`} className='' target="_blank">create url</a>
            </div>
            <div>
                <CopyToClipboard text={`http://localhost:3000/${pathLocation}/?user=${userIdentify}`}>
                    <button>Copy url</button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default ShareData