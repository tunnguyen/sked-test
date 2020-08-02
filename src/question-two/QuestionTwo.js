import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Swimlane } from '../components/swimlane/Swimlane'

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

const handleDate = date => new Date(date).getTime();
const handleCardDescription = (cardTitle, resourceName) => <div className="card__description">
  <strong>{cardTitle }</strong>
  <span>Contact: { resourceName }</span>
</div>

const formatCards = (allocations, items, resources, idKey) => {
  const cards = [];
  allocations.forEach(alloc => {
    const resource = resources[alloc.resourceId];
    const existedCardId = cards.findIndex(c => c[idKey] === alloc[idKey]);

    if (existedCardId > -1) {
      const existedCard = cards[existedCardId];
      cards[existedCardId] = { 
        ...existedCard,
        description: handleCardDescription(existedCard.name, existedCard.assignedContact + ', ' + resource.name)
      }
    } else {
      const item = items[alloc[idKey]];
      cards.push({
        [idKey]: item.id,
        start: handleDate(item.start),
        end: handleDate(item.end),
        name: item.name,
        assignedContact: resource.name,
        description: handleCardDescription(item.name, resource.name)
      })
    }
  })

  return cards;
}

const handleData = ({ resources, jobs, activities, jobAllocations, activityAllocations }) => ([
  {
    title: 'Activities',
    cards: formatCards(activityAllocations, activities, resources, 'activityId')
  },
  {
    title: 'Jobs',
    cards: formatCards(jobAllocations, jobs, resources, 'jobId')
  }
])

export const QuestionTwo = ({ service: { getResources, getJobs, getActivities, getJobAllocations, getActivityAllocations } }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Promise.all([
      getResources(), 
      getJobs(), 
      getActivities(), 
      getJobAllocations(), 
      getActivityAllocations()]
    )
    .then(res => {
      const fetchedData = {};
      res.forEach(({ type, data }) => {
          fetchedData[type] = data;
      })
      setData(handleData(fetchedData));
    });
  }

  return (
    <SectionGroup>
      <SectionPanel>
        <Swimlane lanes={ data } start={ handleDate(RANGE_START) } end={ handleDate(RANGE_END) } />
      </SectionPanel>
    </SectionGroup>
  )
}