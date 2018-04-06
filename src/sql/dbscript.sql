-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Mrz 2018 um 11:30
-- Server-Version: 10.1.29-MariaDB
-- PHP-Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Datenbank: `lightcontrol`
--
CREATE DATABASE IF NOT EXISTS `lightcontrol` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `lightcontrol`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `value` varchar(128) NOT NULL,
  `valuetype` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `settings`
--

INSERT INTO `settings` (`id`, `channel`, `name`, `value`, `valuetype`) VALUES
(1, 1, 'dimvalue', '123', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settingvaluetypes`
--

DROP TABLE IF EXISTS `settingvaluetypes`;
CREATE TABLE IF NOT EXISTS `settingvaluetypes` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `settingvaluetypes`
--

INSERT INTO `settingvaluetypes` (`id`, `name`) VALUES
(1, 'integer'),
(2, 'double'),
(3, 'string');
COMMIT;
