-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 24 déc. 2023 à 16:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommercedb`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `Category_ID` int(11) NOT NULL,
  `Name` varchar(40) DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  `Image` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`Category_ID`, `Name`, `Description`, `Image`) VALUES
(1, 'High Tech', 'High tech products', '..\\frontend\\public\\images\\1703266001648--2.png');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `Order_ID` int(11) NOT NULL,
  `Order_Date` date DEFAULT NULL,
  `Client_ID` int(11) DEFAULT NULL,
  `Order_Product_ID` int(11) DEFAULT NULL,
  `Order_Status` varchar(15) DEFAULT 'pending' CHECK (`Order_Status` = 'pending' or `Order_Status` = 'confirmed' or `Order_Status` = 'canceled')
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`Order_ID`, `Order_Date`, `Client_ID`, `Order_Product_ID`, `Order_Status`) VALUES
(8, '2023-12-23', 13, NULL, 'pending'),
(9, '2023-12-23', 1, NULL, 'confirmed'),
(10, '2023-12-23', 2, NULL, 'pending');

-- --------------------------------------------------------

--
-- Structure de la table `order_products`
--

CREATE TABLE `order_products` (
  `Order_Product_ID` int(11) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT 1,
  `Order_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `order_products`
--

INSERT INTO `order_products` (`Order_Product_ID`, `Product_ID`, `Quantity`, `Order_ID`) VALUES
(8, 13, 2, 8),
(9, 14, 1, 8),
(10, 13, 2, 9),
(11, 14, 3, 9),
(12, 13, 1, 10),
(13, 14, 4, 10);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Product_Status` varchar(15) DEFAULT NULL,
  `Category_ID` int(11) DEFAULT NULL,
  `Sub_Category_ID` int(11) DEFAULT NULL,
  `Price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Description`, `Product_Status`, `Category_ID`, `Sub_Category_ID`, `Price`) VALUES
(13, 'redmi 14', 'redmi the best ', NULL, 1, 6, 155.1),
(14, 'iphone 14', 'iphone la classe khou', NULL, 1, 6, 198745);

--
-- Déclencheurs `products`
--
DELIMITER $$
CREATE TRIGGER `trg_check_Product_Status` BEFORE INSERT ON `products` FOR EACH ROW BEGIN
    IF NEW.Product_Status NOT IN ('InStock', 'NotInStock') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid value for Product_Status';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `product_images`
--

CREATE TABLE `product_images` (
  `Image_ID` int(11) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Image_URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `product_images`
--

INSERT INTO `product_images` (`Image_ID`, `Product_ID`, `Image_URL`) VALUES
(1, 13, '..\\frontend\\public\\images\\1703276125137--7.png'),
(2, 13, '..\\frontend\\public\\images\\1703276125143--1.png'),
(3, 14, '..\\frontend\\public\\images\\1703277139849--6.png'),
(4, 14, '..\\frontend\\public\\images\\1703277139854--5.png'),
(5, 14, '..\\frontend\\public\\images\\1703277139859--11.png');

-- --------------------------------------------------------

--
-- Structure de la table `ratings`
--

CREATE TABLE `ratings` (
  `Rating_ID` int(11) NOT NULL,
  `Stars_Number` int(11) DEFAULT NULL,
  `User_Comment` varchar(150) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Product_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `ratings`
--

INSERT INTO `ratings` (`Rating_ID`, `Stars_Number`, `User_Comment`, `User_ID`, `Product_ID`) VALUES
(1, 5, 'Great product!', 1, 14),
(2, 4, 'cool product!', 1, 13),
(3, 3, 'bad product!', 2, 13),
(4, 3, 'normal product!', 2, 14);

-- --------------------------------------------------------

--
-- Structure de la table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `Sub_Category_ID` int(11) NOT NULL,
  `Name` varchar(40) DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  `Image` varchar(150) DEFAULT NULL,
  `Mother_Category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `sub_categories`
--

INSERT INTO `sub_categories` (`Sub_Category_ID`, `Name`, `Description`, `Image`, `Mother_Category`) VALUES
(2, 'Phones', 'find all your favourite phones', '..\\frontend\\public\\images\\1703267760906--7.png', 1),
(6, 'Pc', 'Pcs and accessories', '..\\frontend\\public\\images\\1703270772904--6.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `User_ID` int(11) NOT NULL,
  `Username` varchar(40) DEFAULT NULL,
  `User_Password` varchar(100) DEFAULT NULL,
  `Email` varchar(40) DEFAULT NULL,
  `First_Name` varchar(40) DEFAULT NULL,
  `Last_Name` varchar(40) DEFAULT NULL,
  `Wilaya` varchar(30) DEFAULT NULL,
  `Adress` varchar(40) DEFAULT NULL,
  `Phone_Number` int(11) DEFAULT NULL,
  `Is_Admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`User_ID`, `Username`, `User_Password`, `Email`, `First_Name`, `Last_Name`, `Wilaya`, `Adress`, `Phone_Number`, `Is_Admin`) VALUES
(1, 'wahidslimani', '$2a$10$kOmpcK2sOlMBg3zVPDu/Ae7zxJbbmyNNovuW0G5kXeI6Ajj5J/GKO', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, 'wahid', '$2a$10$j3.eazeopWhBxqKQjPSiCuMe3xbd7JNGdJzxNZyG1ZTHY3pZbjL3e', NULL, NULL, NULL, NULL, NULL, NULL, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Client_ID` (`Client_ID`),
  ADD KEY `Order_Product_ID` (`Order_Product_ID`);

--
-- Index pour la table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`Order_Product_ID`),
  ADD KEY `Product_ID` (`Product_ID`),
  ADD KEY `Order_ID` (`Order_ID`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `fk_Category` (`Category_ID`),
  ADD KEY `fk_SUBCategory` (`Sub_Category_ID`);

--
-- Index pour la table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`Image_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Index pour la table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`Rating_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Index pour la table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`Sub_Category_ID`),
  ADD KEY `fk_Mother_Category` (`Mother_Category`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `Order_Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `Image_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `Rating_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `Sub_Category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Order_Product_ID`) REFERENCES `order_products` (`Order_Product_ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_Category` FOREIGN KEY (`Category_ID`) REFERENCES `categories` (`Category_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_SUBCategory` FOREIGN KEY (`Sub_Category_ID`) REFERENCES `sub_categories` (`Sub_Category_ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `fk_Mother_Category` FOREIGN KEY (`Mother_Category`) REFERENCES `categories` (`Category_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
