const generateRandomNumber = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

export default generateRandomNumber;
