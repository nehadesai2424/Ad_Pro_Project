-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2025 at 05:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ad_pro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `adschedules`
--

CREATE TABLE `adschedules` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `clientId` int(11) NOT NULL,
  `pmediaId` int(11) NOT NULL,
  `adDate` date NOT NULL,
  `description` text NOT NULL,
  `pmediaRoId` int(11) DEFAULT NULL,
  `beforeClientMessage` text DEFAULT NULL,
  `beforeAgencyMessage` text DEFAULT NULL,
  `onDateClientMessage` text DEFAULT NULL,
  `onDateAgencyMessage` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adschedules`
--

INSERT INTO `adschedules` (`id`, `agencyId`, `clientId`, `pmediaId`, `adDate`, `description`, `pmediaRoId`, `beforeClientMessage`, `beforeAgencyMessage`, `onDateClientMessage`, `onDateAgencyMessage`) VALUES
(8, NULL, 25, 6, '2025-04-08', '..', NULL, NULL, NULL, NULL, NULL),
(9, NULL, 25, 4, '2025-04-02', '........', NULL, '..', '....', NULL, NULL),
(11, NULL, 25, 1, '2025-04-16', '..', NULL, NULL, NULL, NULL, NULL),
(12, NULL, 25, 7, '2025-04-01', '..', NULL, NULL, '..', NULL, NULL),
(13, NULL, 25, 6, '2025-04-09', '..', NULL, NULL, NULL, NULL, NULL),
(15, NULL, 25, 6, '2025-04-02', '..', NULL, NULL, NULL, NULL, NULL),
(20, NULL, 25, 6, '0000-00-00', '...', NULL, NULL, NULL, NULL, NULL),
(21, NULL, 25, 6, '0000-00-00', '..', NULL, NULL, NULL, NULL, NULL),
(22, NULL, 25, 6, '0000-00-00', '..', NULL, NULL, NULL, NULL, NULL),
(23, NULL, 25, 4, '2025-04-01', '...', NULL, NULL, NULL, NULL, NULL),
(24, NULL, 25, 6, '2025-04-01', '..', NULL, NULL, NULL, NULL, NULL),
(25, NULL, 25, 6, '2025-04-01', '..', NULL, NULL, NULL, NULL, NULL),
(26, NULL, 25, 6, '2025-05-12', '..', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `stateId` int(11) DEFAULT NULL,
  `ownername` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `logopath` varchar(100) NOT NULL,
  `signaturepath` varchar(100) NOT NULL,
  `stamppath` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `name`, `address`, `city`, `district`, `stateId`, `ownername`, `contact`, `email`, `logopath`, `signaturepath`, `stamppath`) VALUES
(15, 'iGAP Technologies', 'Rajarampuri 4th Lane', 'Kolhapur', 'Kolhapur', 1, 'Abhijit Gatade', '9561320192', 'gatadeabhijit@gmai.com', '', '', ''),
(19, 'ABC Pvt Ltd', 'Kolhapur,Maharashtra', 'Kolhapur', 'Kolhapur', 1, 'Neha Desai', '9876543987', 'neha@gmail.com', '', '', ''),
(21, 'ABC Pvt Ltd', 'Kolhapur,Maharashtra', 'Kolhapur', 'Kolhapur', 1, 'Neha Desai', '9876543987', 'nehadesai@gmail.com', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `gstNo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `agencyId`, `name`, `contact`, `address`, `stateId`, `gstNo`) VALUES
(25, 21, 'ABC Pvt Ltd', '9876543210', 'Rajarampuri 4th lane,Kolhapur', 1, 'GST12345');

-- --------------------------------------------------------

--
-- Table structure for table `emediaros`
--

CREATE TABLE `emediaros` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) NOT NULL,
  `financialYear` varchar(9) NOT NULL,
  `roNo` varchar(50) NOT NULL,
  `roDate` date NOT NULL,
  `clientId` int(11) NOT NULL,
  `emediaId` int(11) NOT NULL,
  `centers` text NOT NULL,
  `language` varchar(50) NOT NULL,
  `caption` text NOT NULL,
  `noOfRecords` int(11) NOT NULL,
  `totalSpots` int(11) NOT NULL,
  `totalCharges` decimal(12,2) NOT NULL,
  `comissionPercent` decimal(5,2) NOT NULL,
  `comissionAmount` decimal(12,2) NOT NULL,
  `chequeNo` varchar(50) NOT NULL,
  `chequeDate` date NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `roBillAmount` decimal(12,2) NOT NULL,
  `instructions` text NOT NULL,
  `gstId` int(11) NOT NULL,
  `cgstPercent` decimal(5,2) NOT NULL,
  `cgstAmount` decimal(12,2) NOT NULL,
  `sgstPercent` decimal(5,2) NOT NULL,
  `sgstAmount` decimal(12,2) NOT NULL,
  `igstPercent` decimal(5,2) NOT NULL,
  `igstAmount` decimal(12,2) NOT NULL,
  `ccPercent` decimal(5,2) NOT NULL,
  `ccAmount` decimal(12,2) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emediaros`
--

INSERT INTO `emediaros` (`id`, `agencyId`, `financialYear`, `roNo`, `roDate`, `clientId`, `emediaId`, `centers`, `language`, `caption`, `noOfRecords`, `totalSpots`, `totalCharges`, `comissionPercent`, `comissionAmount`, `chequeNo`, `chequeDate`, `bankName`, `roBillAmount`, `instructions`, `gstId`, `cgstPercent`, `cgstAmount`, `sgstPercent`, `sgstAmount`, `igstPercent`, `igstAmount`, `ccPercent`, `ccAmount`, `status`) VALUES
(1, 15, '2024-2025', 'RO12345', '2025-04-29', 25, 18, 'Mumbai, Delhi, Bangalore', 'English', 'New campaign caption for summer', 100, 50, 150000.00, 10.00, 15000.00, 'CHQ98765', '2025-04-28', 'State Bank of India', 135000.00, 'Run ads between 6 PM to 9 PM', 46, 9.00, 12150.00, 9.00, 12150.00, 0.00, 0.00, 2.00, 2700.00, 'pending'),
(4, 15, '', '1', '2025-04-30', 25, 18, '2', 'Hindi', 'eee', 2, 1, 1.00, 11.00, 1.00, '1', '2025-05-29', 'bb', 11.00, 'aa', 46, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.00, 0.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `emedias`
--

CREATE TABLE `emedias` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `gstNo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emedias`
--

INSERT INTO `emedias` (`id`, `agencyId`, `name`, `contact`, `address`, `stateId`, `gstNo`) VALUES
(18, NULL, 'E-Media Agency', '976543212', '123 Digital Park, Bangalore', 4, '29LMNOP9101Q2G7');

-- --------------------------------------------------------

--
-- Table structure for table `financialyears`
--

CREATE TABLE `financialyears` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `financialyears`
--

INSERT INTO `financialyears` (`id`, `name`, `startDate`, `endDate`) VALUES
(2, 'FY 2024-2025', '2024-04-01', '2025-03-31'),
(8, 'FY 2023-2024', '2023-04-01', '2024-03-30');

-- --------------------------------------------------------

--
-- Table structure for table `gsts`
--

CREATE TABLE `gsts` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `cgstPercent` decimal(5,2) NOT NULL,
  `sgstPercent` decimal(5,2) NOT NULL,
  `igstPercent` decimal(5,2) NOT NULL,
  `gstCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gsts`
--

INSERT INTO `gsts` (`id`, `agencyId`, `title`, `cgstPercent`, `sgstPercent`, `igstPercent`, `gstCode`) VALUES
(46, NULL, 'GST on Luxury Goods', 9.00, 9.00, 18.00, 'GST004');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `holidayDate` varchar(10) DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `every_year` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `agencyId`, `holidayDate`, `reason`, `every_year`) VALUES
(39, NULL, '01-04-2025', 'Holiday', 'No'),
(45, NULL, '14-04-2025', 'Ambedkar Jayanti', 'Yes'),
(46, NULL, '16-04-2025', 'Holiday', 'No'),
(47, NULL, '16-04-2025', '..', 'No'),
(48, NULL, '01-05-2025', 'Maharashtra Day', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `invoicedetails`
--

CREATE TABLE `invoicedetails` (
  `id` int(11) NOT NULL,
  `invoiceId` int(11) DEFAULT NULL,
  `srNo` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) NOT NULL,
  `financialYear` varchar(20) DEFAULT NULL,
  `invoiceNo` varchar(50) DEFAULT NULL,
  `invoiceDate` date DEFAULT NULL,
  `clientId` int(11) NOT NULL,
  `itemCount` int(11) DEFAULT 0,
  `amount` decimal(10,2) DEFAULT 0.00,
  `discount` decimal(10,2) DEFAULT 0.00,
  `taxableAmount` decimal(10,2) DEFAULT 0.00,
  `gstId` int(11) DEFAULT NULL,
  `cgstPercent` decimal(5,2) DEFAULT 0.00,
  `cgstAmount` decimal(10,2) DEFAULT 0.00,
  `sgstPercent` decimal(5,2) DEFAULT 0.00,
  `sgstAmount` decimal(10,2) DEFAULT 0.00,
  `igstPercent` decimal(5,2) DEFAULT 0.00,
  `igstAmount` decimal(10,2) DEFAULT 0.00,
  `billAmount` decimal(12,2) DEFAULT 0.00,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `agencyId`, `financialYear`, `invoiceNo`, `invoiceDate`, `clientId`, `itemCount`, `amount`, `discount`, `taxableAmount`, `gstId`, `cgstPercent`, `cgstAmount`, `sgstPercent`, `sgstAmount`, `igstPercent`, `igstAmount`, `billAmount`, `createdAt`, `updatedAt`) VALUES
(12, 15, '', '1', '2025-04-16', 25, 2, 10000.00, 1000.00, 1000.00, 46, 14.00, 500.00, 14.00, 500.00, 0.00, 0.00, 10000.00, '2025-04-16 06:16:58', '2025-04-16 08:24:53'),
(14, 15, '', '2', '2025-05-14', 25, 4, 10000.00, 1000.00, 1000.00, 46, 9.00, 100.00, 9.00, 100.00, 0.00, 0.00, 10000.00, '2025-04-16 14:47:25', '2025-04-16 14:47:25');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `isparent` tinyint(1) NOT NULL DEFAULT 0,
  `parentid` int(11) DEFAULT NULL,
  `srno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `title`, `link`, `isparent`, `parentid`, `srno`) VALUES
(1, '...', '...', 0, NULL, 11);

-- --------------------------------------------------------

--
-- Table structure for table `modulemenus`
--

CREATE TABLE `modulemenus` (
  `id` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`) VALUES
(2, '..');

-- --------------------------------------------------------

--
-- Table structure for table `pmediaros`
--

CREATE TABLE `pmediaros` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) NOT NULL,
  `financialYear` varchar(9) NOT NULL,
  `roNo` varchar(50) NOT NULL,
  `roDate` date NOT NULL,
  `clientId` int(11) NOT NULL,
  `pmediaId` int(11) NOT NULL,
  `centers` text NOT NULL,
  `language` varchar(50) NOT NULL,
  `caption` text NOT NULL,
  `noOfRecords` int(11) NOT NULL,
  `paidDays` int(11) NOT NULL,
  `freeDays` int(11) NOT NULL,
  `totalCharges` decimal(12,2) NOT NULL,
  `comissionPercent` decimal(5,2) NOT NULL,
  `comissionAmount` decimal(12,2) NOT NULL,
  `chequeNo` varchar(50) NOT NULL,
  `chequeDate` date NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `roBillAmount` decimal(12,2) NOT NULL,
  `instructions` text NOT NULL,
  `gstId` int(11) NOT NULL,
  `cgstPercent` decimal(5,2) NOT NULL,
  `cgstAmount` decimal(12,2) NOT NULL,
  `sgstPercent` decimal(5,2) NOT NULL,
  `sgstAmount` decimal(12,2) NOT NULL,
  `igstPercent` decimal(5,2) NOT NULL,
  `igstAmount` decimal(12,2) NOT NULL,
  `ccPercent` decimal(5,2) NOT NULL,
  `ccAmount` decimal(12,2) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pmediaros`
--

INSERT INTO `pmediaros` (`id`, `agencyId`, `financialYear`, `roNo`, `roDate`, `clientId`, `pmediaId`, `centers`, `language`, `caption`, `noOfRecords`, `paidDays`, `freeDays`, `totalCharges`, `comissionPercent`, `comissionAmount`, `chequeNo`, `chequeDate`, `bankName`, `roBillAmount`, `instructions`, `gstId`, `cgstPercent`, `cgstAmount`, `sgstPercent`, `sgstAmount`, `igstPercent`, `igstAmount`, `ccPercent`, `ccAmount`, `status`) VALUES
(3, 15, '2024-2025', 'RO67890', '2025-04-29', 25, 7, 'Mumbai, Pune, Nagpur', 'Marathi', 'Print media campaign for summer sales', 50, 5, 2, 80000.00, 12.00, 9600.00, 'CHQ12345', '2025-04-28', 'HDFC Bank', 70400.00, 'Place ads on weekends only', 46, 9.00, 6336.00, 9.00, 6336.00, 0.00, 0.00, 1.50, 1056.00, 'pending'),
(11, 15, '', '1', '2025-05-20', 25, 6, '', '', '', 0, 1, 11, 1.00, 0.00, 1.00, '', '1899-11-29', '1', 1.00, '1', 46, 1.00, 1.00, 2.00, 2.00, 1.00, 1.00, 1.00, 1.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `pmedias`
--

CREATE TABLE `pmedias` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `gstNo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pmedias`
--

INSERT INTO `pmedias` (`id`, `agencyId`, `name`, `contact`, `address`, `stateId`, `gstNo`) VALUES
(1, NULL, 'Media Solutions Ltd', '9856231470', '11, Ad Agency Hub , Maharashtra', 1, '33MSLDE2345F1Z6'),
(3, NULL, 'ABC Pvt Ltd', '7574698765', '123, Main Street, Mumbai', 1, 'GST1234557'),
(4, NULL, 'PQR Media House', '9123456789', '78, Media Lane', 1, '29PQRAB1234C1Z8'),
(6, NULL, 'XYZ Advertising', '9988776655', '45, Business Road', 6, '07XYZDE5678K1Z3'),
(7, NULL, 'LMN Digital', '9988225566', 'Plot 12, Tech Park', 1, '36LMNCD5678D1Z2');

-- --------------------------------------------------------

--
-- Table structure for table `rolemodules`
--

CREATE TABLE `rolemodules` (
  `id` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'CEO'),
(2, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`) VALUES
(1, 'Maharashtra'),
(4, 'Karnataka'),
(5, 'Delhi'),
(6, 'Goa');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `agencyId`, `email`, `password`, `name`, `createdOn`, `roleId`) VALUES
(39, 15, 'gatadeabhijit@gmail.com', '123456', 'Abhijit Gatade', '2025-04-03 10:11:18', 1),
(40, 15, 'neha@gmail.com', 'abc@123', 'Neha Desai', '2025-04-15 06:28:01', 2);

-- --------------------------------------------------------

--
-- Table structure for table `workschedules`
--

CREATE TABLE `workschedules` (
  `id` int(11) NOT NULL,
  `agencyId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `workDate` varchar(10) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workschedules`
--

INSERT INTO `workschedules` (`id`, `agencyId`, `userId`, `title`, `description`, `workDate`, `status`) VALUES
(34, NULL, 39, '...', '...', '17-04-2025', 'Not Done'),
(35, NULL, 39, '..', '..', '16-04-2025', 'Not Done'),
(36, NULL, 39, '..', '..', '16-04-2025', 'Done'),
(37, NULL, 39, '..', '..', '01-04-2025', 'Done'),
(38, NULL, 39, '..', '..', '15-05-2025', 'Not Done');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adschedules`
--
ALTER TABLE `adschedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `pmediaId` (`pmediaId`);

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gstNo` (`gstNo`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `stateId` (`stateId`);

--
-- Indexes for table `emediaros`
--
ALTER TABLE `emediaros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `emediaId` (`emediaId`),
  ADD KEY `gstId` (`gstId`);

--
-- Indexes for table `emedias`
--
ALTER TABLE `emedias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gstNo` (`gstNo`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `stateId` (`stateId`);

--
-- Indexes for table `financialyears`
--
ALTER TABLE `financialyears`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `gsts`
--
ALTER TABLE `gsts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gstCode` (`gstCode`),
  ADD KEY `agencyId` (`agencyId`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`);

--
-- Indexes for table `invoicedetails`
--
ALTER TABLE `invoicedetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `gstId` (`gstId`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modulemenus`
--
ALTER TABLE `modulemenus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `menuId` (`menuId`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pmediaros`
--
ALTER TABLE `pmediaros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `pmediaId` (`pmediaId`),
  ADD KEY `gstId` (`gstId`);

--
-- Indexes for table `pmedias`
--
ALTER TABLE `pmedias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gstNo` (`gstNo`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `stateId` (`stateId`);

--
-- Indexes for table `rolemodules`
--
ALTER TABLE `rolemodules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `workschedules`
--
ALTER TABLE `workschedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adschedules`
--
ALTER TABLE `adschedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `emediaros`
--
ALTER TABLE `emediaros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `emedias`
--
ALTER TABLE `emedias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `financialyears`
--
ALTER TABLE `financialyears`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gsts`
--
ALTER TABLE `gsts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `invoicedetails`
--
ALTER TABLE `invoicedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `modulemenus`
--
ALTER TABLE `modulemenus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pmediaros`
--
ALTER TABLE `pmediaros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pmedias`
--
ALTER TABLE `pmedias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rolemodules`
--
ALTER TABLE `rolemodules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `workschedules`
--
ALTER TABLE `workschedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adschedules`
--
ALTER TABLE `adschedules`
  ADD CONSTRAINT `adschedules_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `adschedules_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `adschedules_ibfk_3` FOREIGN KEY (`pmediaId`) REFERENCES `pmedias` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `emediaros`
--
ALTER TABLE `emediaros`
  ADD CONSTRAINT `emediaros_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`),
  ADD CONSTRAINT `emediaros_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `emediaros_ibfk_3` FOREIGN KEY (`emediaId`) REFERENCES `emedias` (`id`),
  ADD CONSTRAINT `emediaros_ibfk_4` FOREIGN KEY (`gstId`) REFERENCES `gsts` (`id`);

--
-- Constraints for table `emedias`
--
ALTER TABLE `emedias`
  ADD CONSTRAINT `emedias_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `emedias_ibfk_2` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gsts`
--
ALTER TABLE `gsts`
  ADD CONSTRAINT `gsts_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `holidays`
--
ALTER TABLE `holidays`
  ADD CONSTRAINT `holidays_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoicedetails`
--
ALTER TABLE `invoicedetails`
  ADD CONSTRAINT `invoicedetails_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`gstId`) REFERENCES `gsts` (`id`);

--
-- Constraints for table `modulemenus`
--
ALTER TABLE `modulemenus`
  ADD CONSTRAINT `modulemenus_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `modulemenus_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pmediaros`
--
ALTER TABLE `pmediaros`
  ADD CONSTRAINT `pmediaros_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`),
  ADD CONSTRAINT `pmediaros_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `pmediaros_ibfk_3` FOREIGN KEY (`pmediaId`) REFERENCES `pmedias` (`id`),
  ADD CONSTRAINT `pmediaros_ibfk_4` FOREIGN KEY (`gstId`) REFERENCES `gsts` (`id`);

--
-- Constraints for table `pmedias`
--
ALTER TABLE `pmedias`
  ADD CONSTRAINT `pmedias_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pmedias_ibfk_2` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rolemodules`
--
ALTER TABLE `rolemodules`
  ADD CONSTRAINT `rolemodules_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rolemodules_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workschedules`
--
ALTER TABLE `workschedules`
  ADD CONSTRAINT `workschedules_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workschedules_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
