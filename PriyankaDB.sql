-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2019 at 08:20 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_recorder`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `Id` int(11) NOT NULL,
  `SessionId` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`Id`, `SessionId`, `StudentId`) VALUES
(22, 5, 11),
(23, 5, 12),
(28, 7, 5),
(29, 7, 7),
(30, 7, 15),
(31, 7, 16);

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

CREATE TABLE `batches` (
  `BatchId` int(11) NOT NULL,
  `Batch` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `batches`
--

INSERT INTO `batches` (`BatchId`, `Batch`) VALUES
(41, '10-1'),
(42, '10-2'),
(30, '11-1'),
(43, '11-2'),
(31, '12-1'),
(44, '12-2');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `SessionId` int(11) NOT NULL,
  `SessionName` varchar(40) NOT NULL,
  `Date` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`SessionId`, `SessionName`, `Date`) VALUES
(5, 'chem1', '2019-06-23'),
(7, 'chem3', '2019-06-23'),
(10, 'S1', '2019-06-24');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `StudentId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `BatchId` int(11) NOT NULL,
  `Email` varchar(100) DEFAULT 'No Email',
  `PhoneNo` int(10) DEFAULT '0',
  `Fees` int(11) NOT NULL DEFAULT '0',
  `PaidSessions` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`StudentId`, `Name`, `BatchId`, `Email`, `PhoneNo`, `Fees`, `PaidSessions`) VALUES
(3, '11-1-2', 30, 'email@email.com', 1234567890, 0, 0),
(5, '12-1-2', 31, NULL, NULL, 0, 0),
(6, '11-1-1', 30, NULL, NULL, 0, 0),
(7, '12-1-1', 31, NULL, NULL, 0, 0),
(9, '11-2-1', 43, NULL, NULL, 0, 0),
(10, '11-2-2', 43, NULL, NULL, 0, 0),
(11, '10-1-1', 41, 'emailAA', 123456789, 1000, 0),
(12, '10-1-2', 41, NULL, NULL, 0, 0),
(13, '10-2-1', 42, NULL, NULL, 0, 0),
(14, '10-2-2', 42, NULL, NULL, 0, 0),
(15, '12-2-1', 44, NULL, NULL, 0, 0),
(16, '12-2-2', 44, NULL, NULL, 0, 0),
(21, 'ABC', 41, 'email2', 2, 500, 0),
(22, 'def', 41, 'email1', 123456, 700, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`BatchId`),
  ADD UNIQUE KEY `Batch` (`Batch`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`SessionId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`StudentId`),
  ADD UNIQUE KEY `StudentId` (`StudentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `BatchId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `SessionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `StudentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
