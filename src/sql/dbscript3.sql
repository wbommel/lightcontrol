-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Apr 2018 um 14:43
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
  `DimTime` int(11) DEFAULT NULL COMMENT 'DimTime of Operation. See FromTime and ToTime for explanation.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='					';

--
-- Daten für Tabelle `lightrulesgeneral`
--

INSERT INTO `lightrulesgeneral` (`id`, `Priority`, `From`, `To`, `DimTime`) VALUES
(1, 9999, '0000;01;01;08;00', '9999;12;31;11;00', 30),
(2, 9999, '0000;01;01;16;00', '9999;12;31;20;00', 30);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ruleweekdays`
--

CREATE TABLE `ruleweekdays` (
  `id` int(11) NOT NULL,
  `LightRulesGeneralId` int(11) DEFAULT NULL,
  `WeekdayCode` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `ruleweekdays`
--

INSERT INTO `ruleweekdays` (`id`, `LightRulesGeneralId`, `WeekdayCode`) VALUES
(1, 1, 'Mo'),
(2, 1, 'Tu'),
(3, 1, 'We'),
(4, 1, 'Th'),
(5, 1, 'Fr'),
(6, 2, 'Mo'),
(7, 2, 'Tu'),
(8, 2, 'We'),
(9, 2, 'Th'),
(10, 2, 'Fr');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `lightrulesgeneral`
--
ALTER TABLE `lightrulesgeneral`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `ruleweekdays`
--
ALTER TABLE `ruleweekdays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_idx` (`LightRulesGeneralId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `lightrulesgeneral`
--
ALTER TABLE `lightrulesgeneral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `ruleweekdays`
--
ALTER TABLE `ruleweekdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ruleweekdays`
--
ALTER TABLE `ruleweekdays`
  ADD CONSTRAINT `LightRulesGeneralWeekdays` FOREIGN KEY (`LightRulesGeneralId`) REFERENCES `lightrulesgeneral` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
