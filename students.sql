-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2019 at 08:12 PM
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
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`StudentId`),
  ADD UNIQUE KEY `StudentId` (`StudentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `StudentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
