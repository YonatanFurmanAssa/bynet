-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2022 at 06:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bynet`
--

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(11) NOT NULL,
  `meetings_type_id` int(11) NOT NULL,
  `organizer_id` int(11) NOT NULL,
  `meeting_start` datetime NOT NULL,
  `meeting_end` datetime NOT NULL,
  `client` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `meetings_type_id`, `organizer_id`, `meeting_start`, `meeting_end`, `client`) VALUES
(1, 3, 2, '2022-09-15 10:20:28', '2022-09-15 14:20:28', ''),
(3, 1, 1, '2022-09-15 10:21:19', '2022-09-15 10:21:19', 'VMware'),
(4, 4, 1, '2022-09-21 11:22:30', '2022-09-21 13:22:30', ''),
(5, 3, 3, '2022-09-15 10:22:30', '2022-09-15 10:22:30', ''),
(6, 1, 2, '2022-09-15 07:19:28', '2022-09-15 11:20:28', 'Red Hat'),
(10, 2, 3, '2022-09-15 07:19:28', '2023-09-15 11:20:28', ' '),
(15, 4, 3, '2022-09-22 00:13:00', '2022-09-22 10:13:00', ''),
(16, 4, 3, '2022-09-22 13:55:00', '2022-09-22 16:55:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `meetings_type`
--

CREATE TABLE `meetings_type` (
  `meetings_type_id` int(11) NOT NULL,
  `meetings_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings_type`
--

INSERT INTO `meetings_type` (`meetings_type_id`, `meetings_type`) VALUES
(1, 'Bussiness Meeting'),
(4, 'Lecture Meeting'),
(2, 'Social Meeting'),
(3, 'Staff Meeting');

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `organizer_id` int(11) NOT NULL,
  `organizer_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organizers`
--

INSERT INTO `organizers` (`organizer_id`, `organizer_name`) VALUES
(4, 'Avi'),
(1, 'Dan'),
(3, 'Leonid'),
(2, 'Malchi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `meetings_type_id` (`meetings_type_id`),
  ADD KEY `organizer_id` (`organizer_id`);

--
-- Indexes for table `meetings_type`
--
ALTER TABLE `meetings_type`
  ADD PRIMARY KEY (`meetings_type_id`),
  ADD KEY `meetings_name` (`meetings_type`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`organizer_id`),
  ADD KEY `organizer_name` (`organizer_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `meetings_type`
--
ALTER TABLE `meetings_type`
  MODIFY `meetings_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `organizer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`meetings_type_id`) REFERENCES `meetings_type` (`meetings_type_id`),
  ADD CONSTRAINT `meetings_ibfk_2` FOREIGN KEY (`organizer_id`) REFERENCES `organizers` (`organizer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
