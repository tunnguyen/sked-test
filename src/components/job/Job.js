import React from 'react'
import './Job.css'

export const handleDay = dateString => {
  const date = new Date(dateString)
  const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const day = date.getDate()
  const dayOfWeek = days[ date.getDay() ]
  const month = months[ date.getMonth() ]
  const year = date.getFullYear()

  return `${ dayOfWeek } ${ month } ${ day } ${ year }` 
}

export const handleTime = dateString => {
  const date = new Date(dateString)
  const hour = date.getHours()
  const min = date.getMinutes()

  return `${ hour }:${ min < 10 ? '0' + min : min }`
}

export const Job = ({ order, name, location, start, end, contact }) => (
  <div className="job">
    <div className="job-inner">
      <div className="job__name"><strong>{ name }</strong> { `(Job #${ order })` }</div>
      {location && <span className="job__location">{ location }</span>}
      {contact && <span className="job__contact">{ contact.name }</span>}
      <span className="job__day">{ handleDay(start) }</span>
      <strong className="job__time">{ handleTime(start) } - { handleTime(end) }</strong>
    </div>
  </div>
)