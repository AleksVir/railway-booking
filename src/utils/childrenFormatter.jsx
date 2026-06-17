const childrenFormatter = (number) => {
   const n = number % 100;

   if (n >= 11 && n <= 14) return "детей";

   switch (number % 10) {
      case 1:
         return "ребенок";
      case 2:
      case 3:
      case 4:
         return "ребенка";
      default:
         return "детей";
   }
};

export default childrenFormatter;