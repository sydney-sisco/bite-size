// hopefully converts a unit of measure: "cups" into an index value
// this index value should match the cooresponding id in the
// units_of_measure database table
const findUnitOfMeasureID = unit => {
  const units = [, // leave a blank space because the db starts at id:1
    'each',
    'cup',
    'ounce',
    'gallon',
    'gram',
    'kilogram',
    'liter',
    'milliliter',
    'pint',
    'pound',
    'quart',
    'tablespoon',
    'teaspoon'
  ];

  console.log('unit:', unit);

  // if unit ends with an 's', remove it
  if (unit.slice(unit.length - 1) === 's') {
    unit = unit.slice(0, -1);
  }

  // look for unit in the array
  unitsIndex = units.indexOf(unit); // returns -1 if not found

  console.log('unit:', unit, 'index:', unitsIndex);
  
  // if not found, return 1 (indicating 'each')
  return unitsIndex > 0 ? unitsIndex : 1
}

const processIngredients = ingredients => {

  console.log('processing>', ingredients, '<');

  // split the string into an array based on new-line character
  const ingArr = ingredients.split('\n');

  const details = ingArr.map(e => {
    return e.trim().split(' '); // split each line into an array of words
  }).map(e => { // map each line into an array of [quantity, unit, ingredient]
    // let quantity = 1;
    // let unit = 'each';
    // let ingredient = '';

    console.log(e);

    const obj = {
      quantity: 1,
      unitOfMeasure: 'each', // needs to be an ID from `select * from units_of_measure;`
      ingredient: ''
    }
    
    console.log('detail:', e);
    
    if (e.length === 1) { // single word
      obj.ingredient = e[0];
      // return [quantity, unit, ingredient];
      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      console.log(obj);
      return obj;
    }

    if (e.length > 1) {

      // if the first value isn't a number, use 1
      if (!parseInt(e[0])) {
        obj.quantity = 1
        obj.ingredient = e.flat().join(' ');
        obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
        console.log(obj);
        return obj;
      }

      obj.quantity = parseInt(e[0]);

      const ofIndex = e.findIndex(e => e === 'of');

      if (ofIndex === -1) { // 'of' not found
        obj.ingredient = e.slice(1, e.length).flat().join(' ');
      }

      if ( ofIndex > 0) { // split array based on location of 'of'
        obj.unitOfMeasure = e.slice(1, ofIndex).flat().join(' ');
        obj.ingredient = e.slice(ofIndex + 1, e.length).flat().join(' ');
      }

      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      // obj.unitOfMeasure = 1; // hack it in for now
      console.log(obj);
      return obj;
    }
    console.log('returning e???', e);
    return e; // shouldn't get here
  })
  return details;
}

console.log(processIngredients('20 cups of sugar\n2 bananas'));

