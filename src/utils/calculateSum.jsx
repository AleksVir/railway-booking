const calculateSum = (obj, coefficient) => {
   return obj.reduce((total, el) => {
      const sum = el.seats.reduce((acc, seat) => {
         if (seat.priceCoefficient === coefficient) {
            return acc + seat.price * seat.priceCoefficient;
         }
         return acc;
      }, 0);

      return total + sum;
   }, 0);
};

export default calculateSum;