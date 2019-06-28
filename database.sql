-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2019 at 10:53 PM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE IF NOT EXISTS `attendance` (
  `Id` int(11) NOT NULL,
  `SessionId` int(11) NOT NULL,
  `StudentId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`Id`, `SessionId`, `StudentId`) VALUES
(13, 2, 1),
(14, 2, 2),
(15, 2, 3),
(17, 2, 9),
(18, 2, 13),
(19, 2, 14),
(20, 2, 8),
(21, 2, 7),
(22, 2, 6),
(23, 2, 5),
(24, 2, 15),
(25, 3, 1),
(26, 3, 2),
(27, 3, 3),
(29, 3, 5),
(30, 3, 6),
(31, 3, 7),
(32, 3, 8),
(33, 3, 15),
(34, 3, 14),
(35, 3, 13),
(36, 3, 9),
(37, 4, 5),
(38, 4, 6),
(39, 4, 7),
(40, 4, 8),
(41, 4, 9),
(42, 4, 13),
(43, 4, 14),
(45, 4, 3),
(46, 4, 2),
(47, 4, 1),
(48, 4, 15),
(62, 6, 1),
(63, 6, 2),
(64, 6, 5),
(65, 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

CREATE TABLE IF NOT EXISTS `batches` (
  `BatchId` int(11) NOT NULL,
  `Batch` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

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

CREATE TABLE IF NOT EXISTS `sessions` (
  `SessionId` int(11) NOT NULL,
  `SessionName` varchar(40) NOT NULL,
  `Date` varchar(13) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`SessionId`, `SessionName`, `Date`) VALUES
(2, 's1', '2019-06-22'),
(3, 's2', '2019-06-25'),
(4, 's3', '2019-06-28'),
(6, 's4', '2019-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `StudentId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `BatchId` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNo` varchar(20) NOT NULL,
  `Fees` int(11) NOT NULL DEFAULT '0',
  `PaidSessions` decimal(5,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`StudentId`, `Name`, `BatchId`, `Email`, `PhoneNo`, `Fees`, `PaidSessions`) VALUES
(1, '10-1-1', 41, '', '', 123, '3.00'),
(2, '10-1-2', 41, 'newemail@gmail.com', '1234567890', 150, '0.00'),
(3, '10-2-1', 42, '', '', 321, '0.00'),
(5, '11-1-1', 30, 'asdf@amx.com', '5432167890', 45, '0.00'),
(6, '11-1-2', 30, '', '', 53, '0.00'),
(7, '11-2-1', 43, '', '', 78, '0.00'),
(8, '11-2-2', 43, '', '', 98, '0.00'),
(9, '12-1-1', 31, '', '', 90, '0.00'),
(13, '12-1-2', 31, '', '', 12, '0.00'),
(14, '12-2-1', 44, '', '', 23, '0.00'),
(15, '12-2-2', 44, '', '', 54, '0.00');

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
  ADD KEY `BatchId` (`BatchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `BatchId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `SessionId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `StudentId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `studentbatchkey` FOREIGN KEY (`BatchId`) REFERENCES `batches` (`BatchId`) ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
