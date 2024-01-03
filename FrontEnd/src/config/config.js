import Manette from "@/images/manette.png";
import Tv from "@/images/tv.png";
import Keyboard from "@/images/keyboard.png";
import Chair from "@/images/chair.png";

import PhonesIcon from "@/icons/Category-CellPhone.svg?react";
import Camera from "@/icons/Category-Camera.svg?react";
import Computer from "@/icons/Category-Computer.svg?react";
import Gamepad from "@/icons/Category-Gamepad.svg?react";
import Headphone from "@/icons/Category-Headphone.svg?react";
import SmartWatch from "@/icons/Category-SmartWatch.svg?react";


export const PRODUCTS = [
  {
    Id_product: 1,
    Name: "HAVIT HV-G92 Gamepad",
    image: Manette,
    description: "",
    Price: 100,
    Id_category: 6,
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
    Id_category: 3,
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

export const CATEGORIES = [
  {
    Category_ID: 1,
    Name: "Phones",
    Image: PhonesIcon,
    Description: "Phones",
  },
  {
    Category_ID: 2,
    Name: "Computers",
    Image: Computer,
    Description: "Computer",
  },
  {
    Category_ID: 3,
    Name: "SmartWatch",
    Image: SmartWatch,
    Description: "SmartWatch",
  },
  {
    Category_ID: 4,
    Name: "Camera",
    Image: Camera,
    Description: "Camera",
  },
  {
    Category_ID: 5,
    Name: "HeadPhones",
    Image: Headphone,
    Description: "Headphone",
  },
  {
    Category_ID: 6,
    Name: "Gaming",
    Image: Gamepad,
    Description: "Gamepad",
  },
];




// CREATE TABLE `categories` (
//   `Category_ID` int(11) NOT NULL,
//   `Name` varchar(40) DEFAULT NULL,
//   `Description` varchar(150) DEFAULT NULL,
//   `Image` varchar(150) DEFAULT NULL
// )
