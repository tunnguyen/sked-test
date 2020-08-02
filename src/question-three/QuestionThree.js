import React, { useState, useEffect } from 'react';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { SectionHeader } from '../components/section/SectionHeader'
import { SectionColumns, Column } from '../components/section/SectionColums'
import { Job } from '../components/job/Job'

import './QuestionThree.css'

export const QuestionThree = ({ service: { getJobs } }) => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data))
  }, [])

  return (
    <SectionGroup>
      <SectionPanel>
        <SectionHeader><h4>Header</h4></SectionHeader>
        <SectionColumns>
          <Column width="30%" background="#e4eef1">
            {jobs.map((job, idx) => <Job { ...job } key={ idx } order={ idx } />)}
            {jobs.map((job, idx) => <Job { ...job } key={ idx } order={ idx } />)}
            {jobs.map((job, idx) => <Job { ...job } key={ idx } order={ idx } />)}
          </Column>
          <Column width="70%">
            {[...Array(10).keys()].map(n => <div key={ n } className="box"><div className="box__content"/></div>) }
          </Column>
        </SectionColumns>
      </SectionPanel>
    </SectionGroup>
  )
}