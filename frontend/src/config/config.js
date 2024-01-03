import Manette from "@/images/manette.png";
import Tv from "@/images/tv.png";
import Keyboard from "@/images/keyboard.png";
import Chair from "@/images/chair.png";


export const PRODUCTS = [
  {
    Id_product: 1,
    Name: "HAVIT HV-G92 Gamepad",
    image: Manette,
    description: "",
    Price: 100,
    Id_category: 1,
    Id_Sub_Category: 1,
    rating: 4,
    totalRatings: 70,
  },
  {
    Id_product: 2,
    Name: "HAVIT HV-G92 Gamepad",
    image: Keyboard,
    description: "",
    Price: 120,
    Id_category: 1,
    Id_Sub_Category: 2,
    rating: 4,
    totalRatings: 70,
  },
  {
    Id_product: 3,
    Name: "HAVIT HV-G92 Gamepad",
    image: Tv,
    description: "",
    Price: 1900,
    Id_category: 1,
    Id_Sub_Category: 3,
    rating: 5,
    totalRatings: 70,
  },
  {
    Id_product: 4,
    Name: "HAVIT HV-G92 Gamepad",
    image: Chair,
    description: "",
    Price: 40,
    Id_category: 1,
    Id_Sub_Category: 4,
    rating: 3,
    totalRatings: 70,
  },
];

export const Category= [
  {
    Category_ID:1,
    Name:"Phones",
    image:"",
  },
  {
    Category_ID:2,
    Name:"Computers",
    image:"",
  },
  {
    Category_ID:3,
    Name:"SmartWatch",
    image:"",
  },
  {
    Category_ID:4,
    Name:"Camera",
    image:"",
  },
  {
    Category_ID:5,
    Name:"HeadPhones",
    image:"",
  },
  {
    Category_ID:6,
    Name:"Gaming",
    image:"",
  },

]


// CREATE TABLE `categories` (
//   `Category_ID` int(11) NOT NULL,
//   `Name` varchar(40) DEFAULT NULL,
//   `Description` varchar(150) DEFAULT NULL,
//   `Image` varchar(150) DEFAULT NULL
// )
