const seatsWordFormatter = (number) => {
   const n = number % 100;

   if (n >= 11 && n <= 14) return "мест";

   switch (number % 10) {
      case 1:
         return "место";
      case 2:
      case 3:
      case 4:
         return "места";
      default:
         return "мест";
   }
};

export default seatsWordFormatter;