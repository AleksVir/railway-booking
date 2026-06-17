const ticketWordFormatter = (number) => {
   const n = number % 100;

   if (n >= 11 && n <= 14) return "билетов";

   switch (number % 10) {
      case 1:
         return "билет";
      case 2:
      case 3:
      case 4:
         return "билета";
      default:
         return "билетов";
   }
};

export default ticketWordFormatter;