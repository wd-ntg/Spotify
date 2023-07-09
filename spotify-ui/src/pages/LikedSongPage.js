import React from 'react'
import LoggedInContainer from '../containers/LoggedInContainer'
import SingleSongCard from '../components/SingleSongCard'

export default function LikedSongPage() {
  return (
    <LoggedInContainer>
        <div className='p-8'>
        <div className='text-left text-white'>
            Những bài hát đã Liked
        </div>
        </div>
    </LoggedInContainer>
  )
}
