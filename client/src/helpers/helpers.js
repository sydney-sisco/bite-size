const formatIngredients = (name, unit, quantity) => {       
  if (unit === 'each') {
    return `${quantity} ${name}`
  }
  
  if (quantity === 1) {
    return `${quantity} ${unit} of ${name}` 
  }
            
  return `${quantity} ${unit}s of ${name}`
}

module.exports = formatIngredients;  