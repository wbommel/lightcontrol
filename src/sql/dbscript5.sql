-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Apr 2018 um 07:30
-- Server-Version: 10.1.29-MariaDB
-- PHP-Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `lightcontrol`
--
CREATE DATABASE IF NOT EXISTS `lightcontrol` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lightcontrol`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lightrulesgeneral`
--

CREATE TABLE `lightrulesgeneral` (
  `id` int(11) NOT NULL,
  `Priority` int(11) DEFAULT NULL COMMENT 'Priority of Rule. 1 is highest. The bigger the number, the lower the priority.',
  `From` varchar(16) DEFAULT NULL COMMENT 'From/To format is semikolon separated value string:\nYYYY;MM;DD;hh;mm',
  `To` varchar(16) DEFAULT NULL COMMENT 'From/To format is semikolon separated value string:\nYYYY;MM;DD;hh;mm',
  `DimTime` int(11) DEFAULT NULL COMMENT 'DimTime of Operation. See FromTime and ToTime for explanation.',
  `Weekdays` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='					';

--
-- Daten für Tabelle `lightrulesgeneral`
--

INSERT INTO `lightrulesgeneral` (`id`, `Priority`, `From`, `To`, `DimTime`, `Weekdays`) VALUES
(1, 9999, '0000;01;01;08;00', '9999;12;31;11;00', 30, 62),
(2, 9999, '0000;01;01;16;00', '9999;12;31;20;00', 30, 62),
(3, 9999, '0000;01;01;09;00', '9999;12;31;11;00', 30, 65),
(4, 9999, '0000;01;01;16;00', '9999;12;31;20;00', 30, 65);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `lightrulesgeneral`
--
ALTER TABLE `lightrulesgeneral`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `lightrulesgeneral`
--
ALTER TABLE `lightrulesgeneral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
