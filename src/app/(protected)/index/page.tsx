"use client"
import React, { useEffect, useState } from 'react'
import InformacionPersonalDocente from './InformacionPersonalDocente'
import InformacionTrayectoriaDocente from './InformacionTrayectoriaDocente'

type Props = {}

const Index = () => {

  return (
    <>
      <div className='flex  flex-col gap-y-4'>
        <InformacionPersonalDocente />
        < InformacionTrayectoriaDocente />
      </div>
    </>
  )
}

export default Index