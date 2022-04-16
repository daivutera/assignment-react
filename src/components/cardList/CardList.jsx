/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import nextId from 'react-id-generator';
import { getFetchToken } from '../../helpers/postFetch';
import Container from '../../UI/Container';
import Grid from '../../UI/Grid';
import CardItem from './CardItem';

const urlEnd = 'v1/content/skills';

function CardList() {
  const [skillsArray, setSkillsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenFromLocalStorage = localStorage.getItem('token');
  console.log('tokenFromLocalStorage===', tokenFromLocalStorage);

  useEffect(() => {
    getSkillsArray();
  }, []);

  async function getSkillsArray() {
    setLoading(true);
    const skillsArrayFetch = await getFetchToken(urlEnd, tokenFromLocalStorage);
    console.log('skillsArrayFetch', skillsArrayFetch);
    // const skillsArrayJson = await skillsArrayFetch.json();
    if (skillsArrayFetch.length) {
      console.log(skillsArrayFetch);
      setSkillsArray(skillsArrayFetch);
      setLoading(false);
      return;
    }
    console.log('error with getSkillsArray');
    setLoading(false);
    return false;
  }

  return (
    <Container className='listOfSkills'>
      {loading === true && <h2>Loading...</h2>}
      {!loading && !skillsArray.length && (
        <h2>No any skills in the list yet...</h2>
      )}
      <Grid>
        {skillsArray?.map((skillsData) => (
          <CardItem
            key={nextId()}
            description={skillsData.description}
            title={skillsData.title}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default CardList;
