/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import nextId from 'react-id-generator';
import { getFetchToken } from '../../helpers/postFetch';
import Container from '../../UI/Container';
import Grid from '../../UI/Grid';
import CardItem from './CardItem';
import css from './cardList.module.css';

const urlEnd = 'v1/content/skills';

function CardList() {
  const [skillsArray, setSkillsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const tokenFromLocalStorage = localStorage.getItem('token');

  useEffect(() => {
    getSkillsArray();
  }, []);

  async function getSkillsArray() {
    setLoading(true);
    const skillsArrayFetch = await getFetchToken(urlEnd, tokenFromLocalStorage);
    if (skillsArrayFetch.length) {
      setSkillsArray(skillsArrayFetch);
      setLoading(false);
      return;
    }
    setLoading(false);
    return false;
  }

  return (
    <Container className={css.listOfSkills}>
      {loading === true && <h2>Loading...It can take up to 120 seconds</h2>}
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
