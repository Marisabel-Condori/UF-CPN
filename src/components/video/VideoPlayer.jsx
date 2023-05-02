import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({urlVideo}) => {
  return (
    <div>
        {/* <ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/storage-proyect-b295a.appspot.com/o/files%2Fprueba.mp4?alt=media&token=f0ac1f70-2ea6-4ccf-a8dc-ce29c5b4efa3" controls={true}/>  */}
        <ReactPlayer url={urlVideo ? urlVideo :'https://youtu.be/OtUy4QQS4jE'} controls={true}/> 
    </div>
  )
}

export default VideoPlayer