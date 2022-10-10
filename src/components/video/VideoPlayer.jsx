import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = (urlVid) => {
  return (
    <div>
        
        {/* <ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/storage-proyect-b295a.appspot.com/o/files%2Fprueba2.mp4?alt=media&token=35122821-03f5-49e2-8800-1e8fe10de8c0" controls={true}/>  */}
        <ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/storage-proyect-b295a.appspot.com/o/files%2Fprueba.mp4?alt=media&token=f0ac1f70-2ea6-4ccf-a8dc-ce29c5b4efa3" controls={true}/> 
        <ReactPlayer url="urlVid" controls={true}/> 
    </div>
  )
}

export default VideoPlayer