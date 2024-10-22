import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface.js';

const CandidateSearch = () => {
  const [currentCandidate, setCandidate ] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    email: '',
    html_url: '',
    company: '',
  });
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidateData = await searchGithub();
        const firstCandidate = candidateData[0];
        const candidateDetails = await searchGithubUser(firstCandidate.login);
        setCandidate({
          name: candidateDetails.name,
          username: candidateDetails.login,
          location: candidateDetails.location,
          avatar: candidateDetails.avatar,
          email: candidateDetails.email,
          html_url: candidateDetails.html_url,
          company: candidateDetails.company,
        });
      } catch (err) {
        console.error('Error fetching candidate:');
      }
      fetchCandidate();
    } 
  }, []);

  return (
    <div>
      <h1>CandidateSearch</h1>
        <div>
          <img src={currentCandidate.avatar}/>
          <h2>{currentCandidate.name}</h2>
          <p>{currentCandidate.username}</p>
          <p>{currentCandidate.location}</p>
          <p>{currentCandidate.email}</p>
          <p>{currentCandidate.company}</p>
        </div>
    </div>
  )
};

export default CandidateSearch;
