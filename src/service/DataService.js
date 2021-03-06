import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
});

const axiosClient = Axios.create({
  baseURL: 'http://localhost:3400'
})

export const DataService = {
  //
  //  SAMPLE GraphQL Call
  //
  getJobsWithSearchTerm: (searchTerm) => {
    return graphClient.query({
      query: gql`
      query ($searchTerm: String){
        jobs(name: $searchTerm) {
          name,
          start,
          end,
          contact {
            id
            name
          }
        }
      }
      `,
      variables: {
        searchTerm: searchTerm
      }
    })
      .then(result => result.data)
      .then(data => data.jobs)
  },

  //
  //  SAMPLE Normal call
  //
  getJobs: () => {
    return axiosClient.get('/jobs')
      .then(result => ({ type: 'jobs', data: result.data }))
  },
  getResources: () => {
    return axiosClient.get('/resources')
      .then(result => ({ type: 'resources', data: result.data }))
  },
  getActivities: () => {
    return axiosClient.get('/activities')
      .then(result => ({ type: 'activities', data: result.data }))
  },
  getJobAllocations: () => {
    return axiosClient.get('/jobAllocations')
      .then(result => ({ type: 'jobAllocations', data: result.data }))
  },
  getActivityAllocations: () => {
    return axiosClient.get('/activityAllocations')
      .then(result => ({ type: 'activityAllocations', data: result.data }))
  },

}