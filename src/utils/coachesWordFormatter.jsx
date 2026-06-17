const coachesWordFormatter = (number) => {
   const n = number % 100;

   if (n >= 11 && n <= 14) return "вагонов";

   switch (number % 10) {
      case 1:
         return "вагон";
      case 2:
      case 3:
      case 4:
         return "вагона";
      default:
         return "вагонов";
   }
};

export default coachesWordFormatter;