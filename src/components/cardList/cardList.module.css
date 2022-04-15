import PetsItem from './PetsItem';
import { useState, useEffect } from 'react';
import Grid from './../UI/Grid';
//const urlBackEndPetras = 'https://glittery-dull-snickerdoodle.glitch.me';

function CardList(props) {
  // const [petsArray, setPetsArray] = useState([]);

  // useEffect(() => {
  //   getPetsArray();
  // }, []);

  // async function getPetsArray() {
  //   const petsArray = await fetch(`${urlBackEndPetras}/v1/pets/`);
  //   const petsArrayJson = await petsArray.json();
  //   if (petsArrayJson.length) {
  //     console.log(petsArrayJson);
  //     setPetsArray(petsArrayJson);
  //     return;
  //   }
  //   console.log('klaida');
  //   return false;
  // }

  return (
    <Grid>
      {props.items.map((petInfo) => (
        <PetsItem
          onDelete={petInfo.onDelete}
          key={petInfo.id}
          id={petInfo.id}
          dob={petInfo.dob}
          title={
            props.listType === 'log'
              ? `Pet status: ${petInfo.status}`
              : petInfo.name
          }
          body={
            props.listType === 'log'
              ? `Pet Description: ${petInfo.description}`
              : petInfo.client_email
          }
          listType={props.listType}
        />
      ))}
    </Grid>
  );
}

export default CardList;
