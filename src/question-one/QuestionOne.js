import React, { useState } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Job } from '../components/job/Job'

import './QuestionOne.css'

export const QuestionOne = ({ service }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const onSearch = e => {
    const searchTerm = e.target.value;
    if (!searchTerm.length) return setJobs([])
    if (searchTerm.length < 4) return;

    setLoading(true);
    service.getJobsWithSearchTerm('build')
      .then(res => setJobs(res))
      .catch(err => console.log('err', err))
      .finally(() => setLoading(false))
  }

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="form-group">
          <label>Search jobs: </label>
          <input name="searchTerm" onChange={ onSearch } placeholder="Input job's name..." />
        </div>
        {jobs.length ? 
          <div className="job-list">
            {loading && <div className="loader">Loading ...</div>}
            {jobs.map((job, idx) => 
              <Job { ...job } key={ idx } order={ idx } />
            )}
          </div>
          :
          <div className="sorry-message">No jobs found</div>
        }
      </SectionPanel>
    </SectionGroup>
  )
}