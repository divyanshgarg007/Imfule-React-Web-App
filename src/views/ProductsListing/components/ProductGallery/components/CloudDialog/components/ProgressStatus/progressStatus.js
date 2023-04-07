/* eslint-disable no-unused-vars */
import React from 'react'
import {Box, ImageList, Grid} from '@mui/material'
import Loading from '../../../../../../../../images/loading-image.png'
import MyDiv from './progressStatus.style'

export default function ProgressStatus(props) {
  return (
    <>
      {Array.from(props.selectedFiles).map((file, index) => {
        return (<>
          {props?.progressPercentage[file?.name] && props.progressPercentage[file.name]?.status !== -1 &&
            <div key={index} className="percent_box">
              <div className="loading_image">
                <img src={Loading} />
              </div>
              <div className="percent_body">
                <progress id={props.progressPercentage[file.name]?.id} value={props.progressPercentage[file.name]?.status} max="100" />
                {props.progressPercentage[file.name]?.status} %</div>
            </div>
          }
        </>
        )
      })
      }
    </>
  )
}
